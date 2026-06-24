# API Client & WebSocket Architecture

---

## HTTP API Client

### Configuration (`src/config.ts`)

| Variable                  | Env Key                    | Default                  |
|---------------------------|----------------------------|--------------------------|
| `APP_NAME`                | `VITE_APP_NAME`            | `"App Name"`             |
| `MOCK_API_ON`             | `VITE_MOCK_API_ON`         | `false`                  |
| `BACKEND_SERVER`          | `VITE_BACKEND_SERVER`      | `"http://localhost:30000"` |
| `API_BASE_URL`            | `VITE_API_BASE_URL`        | `"/apiIIIII"`            |
| `SOCKETIO_ENABLED`        | `VITE_SOCKETIO_ENABLED`    | `false`                  |
| `SOCKETIO_ENDPOINT`       | `VITE_SOCKETIO_ENDPOINT`   | `"/wssss"`               |

### Axios Client (`src/api/client.ts`)

A shared Axios instance configured with:

```ts
baseURL = MOCK_API_ON
  ? API_BASE_URL                          // e.g. "/apiIIIII" (relative)
  : `${BACKEND_SERVER}${API_BASE_URL}`    // e.g. "http://localhost:30000/apiIIIII"
```

**Request interceptor** — reads the JWT token from `localStorage` (`key: "token"`) and attaches it as `Authorization: Bearer <token>`.

**Response interceptor** — on `401` responses, removes the token from `localStorage` and redirects to `/login`.

---

### API Modules

All modules import the shared `api` client from `./client`.

#### `src/api/auth-api.ts`

| Function      | Method | Endpoint             | Returns |
|---------------|--------|----------------------|---------|
| `loginApi`    | POST   | `/v1/auth/login`     | `{ token, user }` |

#### `src/api/album-apis.ts`

| Function              | Method | Endpoint                   | Returns |
|-----------------------|--------|----------------------------|---------|
| `getAlbums`           | GET    | `/v1/albums`               | `Album[]` |
| `getAlbum`            | GET    | `/v1/albums/:id`           | `Album` |
| `createAlbum`         | POST   | `/v1/albums`               | `Album` |
| `getAlbumImages`      | GET    | `/v1/albums/:id/images?page=&limit=` | `{ items, page, limit, total }` |
| `getAlbumImagesOnePage` | —    | (wraps `getAlbumImages` for TanStack `useInfiniteQuery`) | same |

#### `src/api/image-apis.ts`

| Function           | Method | Endpoint                      | Returns |
|--------------------|--------|-------------------------------|---------|
| `getImages`        | GET    | `/v1/images?cursorId=&search=` | `{ items, nextCursorId }` |
| `getRandomImage`   | GET    | `/v1/images/random`           | `ImageWithCommentary` |
| `getImageFile`     | GET    | `/v1/images/:id/file`         | `Blob` (responseType) |
| `uploadFileApi`    | POST   | `/v1/images`                  | — (multipart/form-data) |

`uploadFileApi` accepts an `onUploadProgress` callback and uses `multipart/form-data`.

#### `src/api/person-apis.ts`

| Function           | Method | Endpoint                     | Returns |
|--------------------|--------|------------------------------|---------|
| `getPersons`       | GET    | `/v1/persons`                | `Person[]` |
| `getPersonFace`    | GET    | `/v1/persons/:id/face`       | `Blob` (responseType) |
| `updatePersonName` | PATCH  | `/v1/persons/:id/name`       | — |

---

### Mock API (`src/mocks/`)

When `VITE_MOCK_API_ON=true`, MSW (Mock Service Worker) intercepts requests in the browser.

| Handler    | Method | URL                     | Returns |
|------------|--------|-------------------------|---------|
| `login`    | POST   | `/api/v1/auth/login`    | Hardcoded JWT + user object |
| `dashboard`| GET    | `/api/v1/dashboard`     | `{ users: 120, sales: 540 }` |

Setup in `src/main.tsx`:
```ts
if (MOCK_API_ON) {
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}
```

---

## WebSocket Architecture

### Singleton Socket Connection (`src/services/socket.ts`)

A singleton `SocketConnection` class wraps `socket.io-client`:

```
┌─────────────────────────────────────────────────────┐
│                    SocketConnection                  │
├─────────────────────────────────────────────────────┤
│  - socket: Socket | null                            │
│  - listeners: ListenerMap                           │
├─────────────────────────────────────────────────────┤
│  + connect(token: string): void                     │
│  + disconnect(): void                               │
│  + addEventListener<K>(event, listener): () => void │
│  + test(): void                                     │
└─────────────────────────────────────────────────────┘
         ▲
         │ singleton
         │
   getSocket(): SocketConnection
```

**Connect flow:**
1. `connect(token)` creates a new `io` instance with `autoConnect: false`
2. Transport forced to `websocket` only
3. JWT token passed via `auth.token`
4. `socket.onAny` catches all events and dispatches to registered typed listeners
5. `socket.connect()` is called explicitly

**Event system:**

| Event               | Payload                                       |
|---------------------|-----------------------------------------------|
| `new_message`       | `{ roomId, content: { type, content } }`     |
| `message_delivered` | `{ messageId }`                               |
| `message_read`      | `{ messageId, readAt }`                       |

Listeners are registered via `addEventListener` which returns an unsubscribe function.

### Socket Provider (`src/providers/socket-provider.tsx`)

```
main.tsx
  └── QueryClientProvider
        └── LocalStorageProvider
              └── AuthProvider
                    └── SocketProvider         ← here
                          └── BrowserRouter
                                └── ...
```

**Behavior:**
- Calls `getSocket()` once to get the singleton
- Reads `isAuthReady` and `token` from `AuthContext`
- When `isAuthReady && token && SOCKETIO_ENABLED`, calls `socket.connect(token)`
- On unmount or token change, calls `socket.disconnect()`
- Exposes `useSocket()` hook that returns the `SocketConnection` instance

**Usage in components:**
```tsx
import { useSocket } from "@/providers/socket-provider";

function MyComponent() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    const unsub = socket.addEventListener("new_message", (payload) => {
      console.log(payload);
    });
    return unsub;
  }, [socket]);
}
```

### Architecture Diagram

```
┌──────────────┐     MSW (when MOCK_API_ON=true)
│  Component   │◄──── intercepts HTTP
└──────┬───────┘
       │ HTTP (axios)          WebSocket
       ▼                              ▼
┌──────────────┐           ┌──────────────────────┐
│  API Modules │           │  SocketConnection     │
│  (auth-api,  │           │  (singleton service)  │
│   album-apis,│           └──────────┬───────────┘
│   ...)       │                      │
└──────┬───────┘                      │
       │                              │
       ▼                              ▼
┌──────────────┐           ┌──────────────────────┐
│  Axios Client│           │  socket.io-client    │
│  (intercepts │           │  (websocket only)    │
│   401 → /login)          └──────────────────────┘
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  Backend Server  │
│  (:30000)        │
└──────────────────┘
```

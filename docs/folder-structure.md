# Project Folder Structure

```
src/
├── api/
│   ├── client.ts
│   ├── auth-api.ts
│   ├── album-apis.ts
│   ├── image-apis.ts
│   └── person-apis.ts
│
├── assets/
│   ├── icons/
│   │   ├── active-stocks-icon.tsx
│   │   ├── calendar-icon.tsx
│   │   └── nifty-large-midcap-icon.tsx
│   ├── animations/
│   │   ├── lottie-folders.json
│   │   └── test-animation.json
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   ├── data-display/
│   │   ├── generic-table.tsx
│   │   ├── infinite-scrolling-image-grid.tsx
│   │   ├── mui-skeleton-table.tsx
│   │   └── search-widget.tsx
│   ├── forms/
│   │   ├── dynamic-field.tsx
│   │   └── dynamic-form.tsx
│   ├── layouts/
│   │   ├── header-component.tsx
│   │   ├── main-layout.tsx
│   │   ├── page-wrapper.tsx
│   │   ├── sidebar-header-component.tsx
│   │   ├── sidebar-menu-item.tsx
│   │   ├── theme-toggle-button.tsx
│   │   └── user-menu.tsx
│   ├── modals/
│   │   ├── alert-modal.tsx
│   │   ├── color-picker-modal.tsx
│   │   ├── confirmation-modal.tsx
│   │   ├── generic-modal.tsx
│   │   └── person-modal.tsx
│   └── navigation/
│       ├── breadcrumbs-component.tsx
│       └── language-switcher.tsx
│
├── context/
│   ├── auth-provider.tsx
│   └── use-auth.ts
│
├── i18n/
│   └── config.ts
│
├── mocks/
│   ├── auth-handlers.ts
│   ├── browser.ts
│   └── server.ts
│
├── pages/
│   ├── album/
│   │   ├── album.tsx
│   │   └── album-image-list-grid.tsx
│   ├── albums/
│   │   └── albums.tsx
│   ├── auth/
│   │   ├── login.tsx
│   │   └── login-form.tsx
│   ├── home/
│   │   ├── home.tsx
│   │   ├── file-upload-form.tsx
│   │   ├── file-upload-modal.tsx
│   │   ├── image-component.tsx
│   │   ├── name-update-modal.tsx
│   │   └── person-face-component.tsx
│   ├── misc/
│   │   └── not-found.tsx
│   ├── photos/
│   │   ├── photos.tsx
│   │   └── album-name-input-modal.tsx
│   └── settings/
│       └── settings.tsx
│
├── providers/
│   ├── local-storage-provider.tsx
│   └── socket-provider.tsx
│
├── routes/
│   └── app-routes.tsx
│
├── services/
│   └── socket.ts
│
├── store/
│   ├── store.ts
│   └── resume-slice.ts
│
├── theme/
│   ├── theme.ts
│   ├── theme.d.ts
│   ├── theme-context.ts
│   └── theme-provider-wrapper.tsx
│
├── utils/
│   └── format-date.ts
│
├── App.css
├── App.tsx
├── config.ts
├── index.css
├── main.tsx
├── setup-tests.ts
└── test-utils.tsx
```

## Directory Legend

| Directory          | Purpose |
|--------------------|---------|
| `api/`             | Axios client + API endpoint modules |
| `assets/icons/`    | SVG React icon components |
| `assets/animations/` | Lottie JSON animation files |
| `assets/`          | Static images (png, svg) |
| `components/data-display/` | Reusable data display components (tables, grids) |
| `components/forms/` | Form builder components |
| `components/layouts/` | App shell layout components |
| `components/modals/` | Modal/dialog components |
| `components/navigation/` | Navigation-related components |
| `context/`         | React context providers and hooks |
| `i18n/`            | Internationalization config |
| `mocks/`           | MSW mock service worker handlers |
| `pages/`           | Page-level components (one subdir per route) |
| `providers/`       | React context providers (non-UI infrastructure) |
| `routes/`          | Route definitions |
| `services/`        | Service-layer modules (socket, etc.) |
| `store/`           | Redux Toolkit store + slices |
| `theme/`           | MUI theme config, types, context |
| `utils/`           | Utility functions |




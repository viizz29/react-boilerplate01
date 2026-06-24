import { Suspense, lazy, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/use-auth";

// Layout
import MainLayout from "../components/layouts/main-layout";
import SettingsPage from "@/pages/settings/settings";


// Lazy pages (code splitting)
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login"));
const NotFound = lazy(() => import("../pages/misc/not-found"));

const LoadingFallback = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
    <CircularProgress />
  </Box>
);

// 🔐 Private Route Wrapper

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <LoadingFallback />;
  }

  return user ? children : <Navigate to="/login" replace />;
};


const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <LoadingFallback />;
  }

  return !user ? children : <Navigate to="/" replace />;
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
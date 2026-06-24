import "./i18n/config";
import { useEffect, useState } from 'react'
import AppRoutes from './routes/app-routes';
import { ThemeContext } from '@/theme/theme-context';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProviderWrapper from "@/theme/theme-provider-wrapper";

const STORAGE_KEY = "app-theme-mode";

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProviderWrapper mode={mode}>
        <ToastContainer
          position="top-center"
          transition={Slide}
        />
        <AppRoutes />
      </ThemeProviderWrapper>
    </ThemeContext.Provider>

  );
}

export default App

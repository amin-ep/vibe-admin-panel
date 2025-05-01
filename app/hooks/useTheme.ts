import { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "~/context/AuthContext";
import { THEME_KEY } from "~/utils/constants";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const { isLoggedIn } = useAuth();

  const setThemeDark = () => {
    localStorage.setItem(THEME_KEY, "dark");
    setTheme("dark");
  };

  const setThemeLight = () => {
    localStorage.setItem(THEME_KEY, "light");
    setTheme("light");
  };

  const setThemeSystem = () => {
    localStorage.removeItem(THEME_KEY);
    setTheme("system");
  };

  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      isLoggedIn
    ) {
      const html = document.documentElement;
      const savedTheme = localStorage.getItem(THEME_KEY);

      if (savedTheme) setTheme(savedTheme as Theme);

      if (theme === "dark") {
        html.classList.add("dark");
      } else if (theme === "light") {
        html.classList.remove("dark");
      } else if (theme === "system") {
        const systemThemeIsDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;

        if (systemThemeIsDark) {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }
      }
    }
  }, [theme, isLoggedIn]);

  return { theme, setThemeDark, setThemeLight, setThemeSystem };
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dark = theme === "dark";

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? (dark ? "Switch to light theme" : "Switch to dark theme") : "Change theme"}
      className="theme-toggle"
    >
      <span className="sr-only">Change theme</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-toggle-icon">
        {!mounted || !dark ? (
          <>
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
          </>
        ) : (
          <path d="M20.2 15.7A8 8 0 0 1 8.3 3.8 8.5 8.5 0 1 0 20.2 15.7Z" />
        )}
      </svg>
    </button>
  );
}

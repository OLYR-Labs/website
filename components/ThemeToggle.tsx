"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-toggle"
    >
      <span className="sr-only">{dark ? "Light mode" : "Dark mode"}</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-toggle-icon">
        {dark ? (
          <path d="M20.2 15.7A8 8 0 0 1 8.3 3.8 8.5 8.5 0 1 0 20.2 15.7Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
          </>
        )}
      </svg>
    </button>
  );
}

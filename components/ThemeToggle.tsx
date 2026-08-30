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
      <span aria-hidden="true" className={`theme-toggle-icon ${dark ? "is-dark" : ""}`}>
        {dark ? "☾" : "☀"}
      </span>
    </button>
  );
}

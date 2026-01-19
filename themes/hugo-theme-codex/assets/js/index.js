/*
 * Handles mobile nav
 */

function toggleMobileNavState() {
  const body = document.querySelector("body");
  body.classList.toggle("nav--active");
}

/*
 * Initializes burger functionality
 */

function initBurger() {
  const burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", toggleMobileNavState);
  }
}

/*
 * Theme toggle (stored in localStorage)
 */

const THEME_STORAGE_KEY = "theme";

function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark" || theme === "light") {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
}

function updateThemeToggle(toggle, theme) {
  const current = theme || getStoredTheme() || getSystemTheme();
  const isDark = current === "dark";
  toggle.setAttribute("data-theme", isDark ? "dark" : "light");
  toggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
}

function initThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) {
    return;
  }

  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
  updateThemeToggle(toggle, storedTheme);

  toggle.addEventListener("click", () => {
    const currentTheme = getStoredTheme() || getSystemTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    updateThemeToggle(toggle, nextTheme);
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    if (!getStoredTheme()) {
      applyTheme(null);
      updateThemeToggle(toggle, null);
    }
  });
}

initBurger();
initThemeToggle();
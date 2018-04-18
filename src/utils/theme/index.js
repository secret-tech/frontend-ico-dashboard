export const getThemeFromStorage = () =>
  localStorage.getItem('theme') || '';

export const setThemeToStorage = (theme) => {
  localStorage.setItem('theme', theme);
};

export const THEMES = {
  dark: 'pt-dark',
  light: 'pt-light'
};

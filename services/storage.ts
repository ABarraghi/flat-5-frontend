export const storage = {
  setValue: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  getValue: (key: string) => {
    return localStorage.getItem(key) || null;
  },
  deleteValue: (key: string) => {
    localStorage.removeItem(key);
  },
};

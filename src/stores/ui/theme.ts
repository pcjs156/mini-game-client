import { create } from "zustand";

type AvailableThemes = "light" | "dark";

interface ThemeState {
  theme: AvailableThemes;
  setTheme: (theme: AvailableThemes) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

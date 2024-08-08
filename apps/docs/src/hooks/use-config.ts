import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultTheme, angularTheme, vueTheme, reactTheme } from "@/lib/theme";
import type { IconLibrary } from "@/types/icons";
import type { Theme } from "@/types/theme";
import type { Style } from "@/config/styles-config";

type Config = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  style: Style["name"];
  setStyle: (style: Style["name"]) => void;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  iconLibrary: IconLibrary;
  setIconLibrary: (iconLibrary: IconLibrary) => void;
  currentFramework: "angular" | "vue" | "react";
  setFramework: (framework: "angular" | "vue" | "react") => void;
};

const themes = {
  react: reactTheme,
  angular: angularTheme,
  vue: vueTheme,
};

export const useConfig = create<Config>()(
  persist(
    (set) => ({
      style: "default",
      mode: "dark",
      iconLibrary: "lucide",
      theme: defaultTheme,
      currentFramework: "react",
      setStyle: (style: Style["name"]) => set((state) => ({ ...state, style })),
      setTheme: (theme: Theme) => set((state) => ({ ...state, theme })),
      setMode: (mode: "light" | "dark") => set((state) => ({ ...state, mode })),
      setIconLibrary: (iconLibrary: IconLibrary) => set((state) => ({ ...state, iconLibrary })),
      setFramework: (framework: "angular" | "vue" | "react") =>
        set((state) => ({
          ...state,
          currentFramework: framework,
          theme: themes[framework] || defaultTheme,
        })),
    }),
    {
      name: "config",
    }
  )
);

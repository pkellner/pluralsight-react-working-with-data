'use client';
import { createContext, ReactNode } from "react";
import useTheme from "@/components/hooks/use-theme";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  if (!ThemeContext) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return ThemeContext;
};

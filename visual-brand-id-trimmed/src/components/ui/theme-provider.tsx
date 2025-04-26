// src/components/theme-provider.tsx
"use client";

import React, { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: "class" | "data-theme";
  defaultTheme?: "system" | "dark" | "light";
  enableSystem?: boolean;
}

export const ThemeProvider = ({
  children,
  ...props
}: ThemeProviderProps) => {
  // cast away the typing quirk in next-themes
  const Provider = NextThemesProvider as any;

  return (
    <Provider {...props}>
      {children}
    </Provider>
  );
};


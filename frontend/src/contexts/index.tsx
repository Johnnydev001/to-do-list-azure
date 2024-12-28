import { createContext } from "react";

export enum THEME_MODE {
  light = 0,
  dark = 1,
}
export const ThemeContext = createContext(THEME_MODE.light);

import { createContext } from "react";
import { ITheme } from "../interfaces/ITheme";

export const MyThemeContext = createContext<ITheme>({
  isDarkTheme: false,
  toggleTheme: ()=>{},
})
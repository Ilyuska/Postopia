import { createContext } from "react";
import { ITheme } from "../interfaces/ITheme";
import { IPaginationContextTypes } from "../interfaces/IPagination";

export const MyThemeContext = createContext<ITheme>({
  isDarkTheme: false,
  toggleTheme: ()=>{},
})

export const PaginationContext = createContext<IPaginationContextTypes>({
  favorites: { 
    value: 1, 
    setValue: () => {} 
  },
  myPosts: { 
    value: 1, 
    setValue: () => {} 
  },
  allPosts: { 
    value: 1, 
    setValue: () => {} 
  },
});
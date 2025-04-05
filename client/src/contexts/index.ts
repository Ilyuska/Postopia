import { createContext } from "react";
import { ITheme } from "../interfaces/ITheme";

interface AuthContextType {
    isAuth: boolean;
    token: string;
    login: (token: string) => void;
    logout: () => void;
  };
  
  // Создаем контекст с начальным значением
  export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    token: '',
    login: () => {},
    logout: () => {},
  });

  export const MyThemeContext = createContext<ITheme>({
    isDarkTheme: false,
    toggleTheme: ()=>{},
  })
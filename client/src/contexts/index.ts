import { createContext } from "react";
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
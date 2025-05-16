import { useState,  FC, ReactNode, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { MyThemeContext } from ".";


type MyThemeProviderProps = {
    children: ReactNode;
  };


const MyThemeProvider: FC<MyThemeProviderProps> = ({ children }) => {
    const lightTheme = createTheme({
        palette: {
          mode: 'light',
          background: {
            default: '#f5f5f5', // Белый фон
            paper: '#ffffff',  // Светло-серый для карточек
          },
          primary: {
            main: '#1976d2',   // Классический синий (акцентные элементы)
            contrastText: '#fff',
          },
          secondary: {
            main: '#bbdefb',  // Голубой (доп. акценты)
            contrastText: '#fff',
          },
          text: {
            primary: '#212121', // Темно-серый (основной текст)
            secondary: '#e0e0e0',
          },
        },
      });
      
      // Создаем темную тему
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          background: {
            default: '#0a1929', // Темно-синий фон (как в GitHub Dark)
            paper: '#132f4c',   // Более светлый синий для карточек
          },
          primary: {
            main: '#90caf9',    // Светло-голубой (акценты)
            contrastText: '#0a1929',
          },
          secondary: {
            main: '#bbdefb',    // Яркий голубой
            contrastText: '#0a1929',
          },
          text: {
            primary: '#e0e0e0', // Светло-серый (текст)
            secondary: '#212121',
          },
        },
      });
      
      const [isDarkTheme, setIsDarkTheme] = useState<boolean>(localStorage.getItem('theme') === "true");

      useEffect(()=> {localStorage.setItem('theme', isDarkTheme.toString())}, [isDarkTheme])
    
      const toggleTheme = (): void => {
          setIsDarkTheme(prevTheme => !prevTheme);
      };

  return (
    <MyThemeContext.Provider value={{ isDarkTheme, toggleTheme}}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    </MyThemeContext.Provider>
  );
};

export default MyThemeProvider;

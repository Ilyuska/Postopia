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
            default: '#ffffff', // Белый фон
            paper: '#f5f5f5',  // Светло-серый для карточек
          },
          primary: {
            main: '#1976d2',   // Классический синий (акцентные элементы)
            contrastText: '#fff',
          },
          secondary: {
            main: '#2196f3',   // Голубой (доп. акценты)
            contrastText: '#fff',
          },
          text: {
            primary: '#212121', // Темно-серый (основной текст)
            secondary: '#757575',
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
            main: '#64b5f6',    // Яркий голубой
            contrastText: '#0a1929',
          },
          text: {
            primary: '#e0e0e0', // Светло-серый (текст)
            secondary: '#b0b0b0',
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

import { useState, useEffect, FC, ReactNode } from "react";
import { AuthContext } from "./index.ts";


type AuthProviderProps = {
    children: ReactNode;
  };


const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");


  useEffect(() => {
    // Проверяем наличие токена в localStorage при загрузке приложения
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuth(true);
    }
  }, []);

  const login = (token:string) => {
    localStorage.setItem("token", token); // Сохраняем токен
    setToken(token);
    setIsAuth(true);
  };

  // Вернуть когда будет сервер куда буду отправлять запрос на получение токена
  //   async (username, password) => {
  //     try {
  //       const response = await axios.post("https://your-api.com/login", {
  //         username,
  //         password,
  //       });
  //       const authToken = response.data.token;
  //       localStorage.setItem("authToken", authToken); // Сохраняем токен
  //       setToken(authToken);
  //       setIsAuth(true);
  //     } catch (error) {
  //       console.error("Login failed:", error.response.data.message);
  //     }
  //   };

  const logout = () => {
    localStorage.removeItem("token"); // Удаляем токен
    setToken("");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

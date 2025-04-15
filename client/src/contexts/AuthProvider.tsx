import { useState, useEffect, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./index.ts";
import { getMe } from "../api/mainAPI.ts";


type AuthProviderProps = {
    children: ReactNode;
  };


const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate()


  useEffect(() => {
    const validationToken =  async () => {
      const validToken = await getMe();
      if (validToken == false) {
        logout()
      }
      else {
        setIsAuth(true);
      }
    }
    validationToken()
  }, []);

  const login = (token:string) => {
    localStorage.setItem("token", token); // Сохраняем токен
    setToken(token);
    setIsAuth(true);
    navigate('/posts')
  };

  
  const logout = () => {
    localStorage.removeItem("token"); // Удаляем токен
    setToken("");
    setIsAuth(false);
    navigate('/')
  };
  
  return (
    <AuthContext.Provider value={{ isAuth, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

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
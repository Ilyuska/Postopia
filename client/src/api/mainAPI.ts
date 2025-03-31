import axios from 'axios'

const BACKEND_LINK = "http://localhost:3000/"

axios.defaults.baseURL = BACKEND_LINK


export const loginAPI = async (data: { email: string; password: string }):Promise<string> => {
    try {
        const response = await axios.post<{token: string}>(
            'login',
            {...data}, // Axios автоматически преобразует в JSON
          );
      
          // Сохраняем токен правильно (response.data.token, а не весь response)
          return response.data.token
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Если сервер возвращает сообщение в response.data.message
            const errorMessage = error.response?.data?.message || 'Неверные учетные данные';
            console.error(errorMessage)
            return ('Неверные данные')
        } else {
            throw new Error('Произошла неизвестная ошибка');
        }
    }
}
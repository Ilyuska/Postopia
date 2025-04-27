import axios from 'axios'
import { ILoginData, IRegisterData, IUser } from '../interfaces/IUser'
import { IPost } from '../interfaces/IPost'

const BACKEND_LINK = "http://localhost:3000"
axios.defaults.baseURL = BACKEND_LINK


export const loginAPI = async (data: ILoginData):Promise<string | ILoginData> => {
    try {
        const response = await axios.post(
            '/login',
            {...data}, // Axios автоматически преобразует в JSON
          );
      
          // Сохраняем токен правильно (response.data.token, а не весь response)
          return response.data.token
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Неверные данные';
            console.error(error)
            return ({email: errorMessage, password: errorMessage})
        } else {
            throw new Error('Произошла неизвестная ошибка');
        }
    }
}


export const registrationAPI = async (data: IRegisterData):Promise <string | IRegisterData> => {
    try {
        const response = await axios.post('/registration', {...data});
        return response.data.token
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.errors || 'Неверные данные';
            let errorObj: IRegisterData = {email: "", password: "", name: ""}

            errorMessage.map((i:{field: string, message: string}) => {
                if (i.field == "email") {
                    errorObj.email = i.message
                } else if (i.field == "password") {
                    errorObj.password = i.message
                } else {
                    errorObj.name = i.message
                }
            })
            return (errorObj)
        } else {
            throw new Error('Произошла неизвестная ошибка');
        }
    }
}


export const postLike = async (id: string) => {
    try {
        await axios.patch(`/posts/${id}/like`, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
    } catch (error) {
        console.error(error)
    }
}


export const getMe = async () => {
    try {
        const response = await axios.get<IUser>('/me', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })

        return response.data as IUser
    } catch (error) {
        console.error(error)
        return false
    }
}

// export const isValidToken = async (token: string) => {
//     try {
//         const response = await axios.get('isValidToken', {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//         })

//         return response.data
//     } catch (error) {
//         console.error(error)
//     }
// }
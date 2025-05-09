import { IPost } from "./IPost"

export interface ILoginData {
    email: string,
    password: string,
}

export interface ILoginError {
    status: number;
    data: ILoginData
}


export interface IRegisterData extends ILoginData {
    firstName: string,
    lastName: string,
    birthday: string,
    avatar?: File
}

export interface IRegisterError {
    status: number;
    data: IRegisterData
}

export interface IUser extends Omit<IRegisterData, 'password' | 'email'> {
    _id: string
    posts: IPost[]
}
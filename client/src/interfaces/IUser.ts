import { IPost } from "./IPost"

export interface ILoginData {
    email: string,
    password: string,
}

export interface IRegisterData extends ILoginData {
    name: string,
}

export interface IUser extends Omit<IRegisterData, 'password'> {
    id: string
    avatar?: string
    posts: IPost[]
}


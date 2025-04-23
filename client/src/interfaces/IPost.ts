import { IUser } from "./IUser";

export interface IPost {
    id: string
    image: string,
    title: string;
    message: string;
    likes: [];
    liked?: boolean
    user: IUser;
    comments: [];
}
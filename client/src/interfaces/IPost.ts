import { IUser } from "./IUser";

export interface IPost {
    _id: string
    image: string,
    title: string;
    message: string;
    likes: [];
    liked?: boolean
    user: Omit<IUser, 'posts'>;
    comments: [];
}
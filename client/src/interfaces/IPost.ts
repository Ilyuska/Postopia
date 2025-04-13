import { IUser } from "./IUser";

export interface IPost {
    _id: string
    image: string,
    title: string;
    message: string;
    likes: [];
    user: IUser;
    comments: [];
}
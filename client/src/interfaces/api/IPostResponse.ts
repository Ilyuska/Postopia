import { IPagination } from "../IPagination";
import { IPost } from "../IPost";

export interface PostResponse {
    posts: IPost[],
    pagination: IPagination
}
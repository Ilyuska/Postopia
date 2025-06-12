import Like from "../models/Like";
import { IPost } from "../models/Post";

export const postsWithLikes = async (posts: IPost[], userId: string) =>
     await Promise.all(
        posts.map(async (post) => {
        const plainPost = post.toObject();
        const likes = await Like.find({post: post.id})
        const like = await Like.findOne({ user: userId, post: post.id });
        return {
            ...plainPost,
            liked: Boolean(like),
            likes: likes.length,
            comments: post.commentsCount,
        };
        })
    );
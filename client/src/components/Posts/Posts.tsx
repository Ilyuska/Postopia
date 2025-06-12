import {FC, useEffect, useMemo, useState} from 'react'
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { IPaginationContextType } from '../../interfaces/IPagination';
import { IPost } from '../../interfaces/IPost';
import { PostResponse } from '../../interfaces/api/IPostResponse';
import Post from '../Post/Post';
import styles from './styles.module.scss'


interface IPostsProps {
    posts: PostResponse | undefined,
    error: FetchBaseQueryError | SerializedError | undefined,
    isLoading: boolean,
    isFetching: boolean,
    currentPage: IPaginationContextType
} 


const Posts: FC<IPostsProps> = ({posts =  {posts: undefined, pagination: {page: 1, totalCount: 1,totalPages: 1}}, isLoading, isFetching, error, currentPage}) => {
    const skeletonPosts: IPost[] = useMemo(() => Array.from({ length: 5 }, () => ({
        _id: '',
        user: { _id: '', firstName: '', lastName: '', birthday: '', avatar: '' },
        image: '',
        title: '',
        message: '',
        liked: false,
        likes: 0,
        comments: 0,
    })), []);

    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();
    
    // Эффект для подгрузки новых постов
    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            currentPage.setValue(currentPage.value+1);
        }
    }, [inView, hasMore, isFetching]);
    
    // Проверяем, есть ли еще страницы
    useEffect(() => {
        if (currentPage.value > posts.pagination.page) {
            currentPage.setValue(posts.pagination.page)
        }
        setHasMore(currentPage.value < posts.pagination.totalPages);
    }, [posts, currentPage.value]);

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: 'background.paper',
        }}>

            {error && (
                <Box sx={{
                    color: 'error.main', 
                    display: 'flex', 
                    justifyContent: 'center',
                    p: 2
                }}>
                    Ошибка при загрузке постов
                </Box>
            )}

            {posts.posts && 
                posts?.posts?.map(post => (
                        <Post post={post} key={post._id} />
                ))
            }
            {(hasMore && skeletonPosts?.length > 0 || isLoading) && skeletonPosts.map((post, index) => (
                index === 0
                    ? <div ref={ref} key={`skeleton-0`}>
                        <Post post={post} key={`post-skeleton-0`} />
                    </div>
                    : <Post post={post} key={`post-skeleton-${index}`} />
            ))}
        </Box>
    );
};

export default Posts;
import { FC, useEffect, useState } from 'react';
import { IPost } from '../../interfaces/IPost';
import { getAllPosts } from '../../api/mainAPI';
import Post from '../../components/Post/Post';
import { postAPI } from '../../store/reducers/allPosts.slice';

const Posts: FC = () => {
  // const [posts, setPosts] = useState<IPost[]>([]);
  // useEffect(() => { 
  //   const fetchPosts = async () => {
  //     try {
  //       const data = await getAllPosts();
  //       if (data) {
  //         setPosts(data);
  //       } else {
  //         console.error('Не удалось загрузить посты');
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при загрузке постов:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const {data: posts, error, isLoading} =  postAPI.useFetchAllPostsQuery(localStorage.getItem('token') || '')


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {isLoading && <h2>Идет загрузка</h2>}
      {error && <div>Произошла ошибка. Подробности в консоли</div>}
      {posts && posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
import { FC, useEffect, useState } from 'react';
import { IPost } from '../../interfaces/IPost';
import { getAllPosts } from '../../api/mainAPI';
import Post from '../../components/Post/Post';

const Posts: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => { 
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        if (data) {
          setPosts(data);
        } else {
          console.error('Не удалось загрузить посты');
        }
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
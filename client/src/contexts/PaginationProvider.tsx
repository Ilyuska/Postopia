import { FC, ReactNode, useState} from 'react';

import { PaginationContext } from '.';

interface IPaginationProvider {
  children: ReactNode;
}

const PaginationProvider: FC<IPaginationProvider> = ({ children }) => {
  const [favorites, setFavorites] = useState(1);
  const [myPosts, setMyPosts] = useState(1);
  const [allPosts, setAllPosts] = useState(1);

  return (
    <PaginationContext.Provider
      value={{
        favorites: { value: favorites, setValue: setFavorites },
        myPosts: { value: myPosts, setValue: setMyPosts },
        allPosts: { value: allPosts, setValue: setAllPosts },
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider
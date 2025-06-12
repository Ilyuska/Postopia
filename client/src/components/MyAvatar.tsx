import {FC} from 'react'
import { Avatar, Skeleton } from '@mui/material';


interface IMyAvatarProps {
    avatar: string,
    firstName: string
    sx?: any
}

const MyAvatar: FC<IMyAvatarProps> = ({avatar, firstName, sx}) => {

    const stringAvatar = (firstName: string) => {
        return {
            sx: {
                backgroundColor: 'gray', // Правильный формат для цвета
            },
            children: `${firstName[0] || ''}`,
        };
    };

  return (
    <>
        {!firstName
        ? (<Skeleton variant='circular'  width={40} height={40} sx={sx}/>) 
        : ( <Avatar
            src={avatar ? `http://localhost:3000/uploads/${avatar}` : undefined}
            {...(!avatar && stringAvatar(firstName))}
            sx={sx}/>)
        }
    </>
   
    
  );
};

export default MyAvatar;
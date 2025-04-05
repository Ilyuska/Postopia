import {FC, useContext} from 'react'
import { AuthContext } from '../contexts';
import Button from '@mui/material/Button';

interface IProfileProps {

}

const Profile: FC<IProfileProps> = ({}) => {
  const {logout} = useContext(AuthContext)
  
  return (
    <div>
      Profile
      <Button variant='outlined' color='error' onClick={logout}>
        Log out
      </Button>
    </div>
  );
};

export default Profile;
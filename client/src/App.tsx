import {FC, useEffect} from 'react'
import MyRoutes from './routes/MyRoutes'
import AuthProvider from './contexts/AuthProvider';


const App: FC = ({}) => {
  useEffect(()=>{}, [localStorage.getItem])
  return (
    <AuthProvider>
      <MyRoutes/>
    </AuthProvider>
  );
};

export default App;
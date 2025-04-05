import {FC, useEffect} from 'react'
import MyRoutes from './routes/MyRoutes'
import AuthProvider from './contexts/AuthProvider';
import MyThemeProvider from './contexts/ThemeProvider';


const App: FC = ({}) => {
  useEffect(()=>{}, [localStorage])



  return (
    <MyThemeProvider>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
      </MyThemeProvider>
  );
};

export default App;
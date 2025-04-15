import {FC} from 'react'
import MyRoutes from './routes/MyRoutes'
import AuthProvider from './contexts/AuthProvider';
import MyThemeProvider from './contexts/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';


const App: FC = ({}) => {
  return (
    <MyThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <MyRoutes />
        </AuthProvider>
      </BrowserRouter>
      </MyThemeProvider>
  );
};

export default App;
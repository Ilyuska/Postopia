import {FC} from 'react'
import MyRoutes from './routes/MyRoutes'
import AuthProvider from './contexts/AuthProvider';
import MyThemeProvider from './contexts/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';


const App: FC = ({}) => {
  return (
    <Provider store = {store}>
      <MyThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <MyRoutes />
          </AuthProvider>
        </BrowserRouter>
        </MyThemeProvider>
      </Provider>
  );
};

export default App;
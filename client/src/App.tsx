import {FC} from 'react'
import MyRoutes from './routes/MyRoutes'
import MyThemeProvider from './contexts/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PaginationProvider from './contexts/PaginationProvider';


const App: FC = ({}) => {
  return (
    <Provider store = {store}>
      <MyThemeProvider>
        <BrowserRouter>
          <PaginationProvider>
            <MyRoutes />
          </PaginationProvider>
        </BrowserRouter>
        </MyThemeProvider>
      </Provider>
  );
};

export default App;
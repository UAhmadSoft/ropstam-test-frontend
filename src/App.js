import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ThemeConfig from './theme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'routes';
import { getMe, getMyNotifications } from 'store/slices/auth/extraReducers';

function App() {
  const { authenticating, isLoggedIn, user } = useSelector((st) => st.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe()).then(({ err }) => {
      if (!err) dispatch(getMyNotifications());
    });
  }, []);

  return (
    <div className='App'>
      <ThemeConfig>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeConfig>
    </div>
  );
}

export default App;

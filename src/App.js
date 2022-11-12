import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ThemeConfig from './theme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'routes';
import { getMe } from 'store/slices/auth/extraReducers';

function App() {
  const { authenticating, isLoggedIn, user } = useSelector((st) => st.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
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

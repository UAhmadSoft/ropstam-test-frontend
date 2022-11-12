import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice, categoriesSlice, carsSlice } from './slices';

import usersSlice from './slices/users';

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    categories: categoriesSlice.reducer,
    cars: carsSlice.reducer,
  }),
});

export default store;

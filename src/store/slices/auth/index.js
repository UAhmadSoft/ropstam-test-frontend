import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getMe,
  login,
  updateMe,
  signUp,
  updatePassword,
  getMyNotifications,
} from './extraReducers';

const initialState = {
  authenticating: true,
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  isLoggedIn: false,
  notifications: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [getMe.pending]: (state, { payload }) => {
      state.authenticating = true;
    },
    [getMe.fulfilled]: (state, { payload }) => ({
      authenticating: false,
      token: payload.token,
      user: payload.user,
      isLoggedIn: true,
      notifications: [],
    }),
    [getMe.rejected]: (state, { payload }) => {
      state.authenticating = false;
    },
    [getMyNotifications.fulfilled]: (state, { payload }) => {
      state.notifications = payload.notifications;
    },

    [login.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      return {
        token: payload.token,
        user: payload.user,
        isLoggedIn: true,
        loading: false,
        authenticating: false,
        notifications: [],
      };
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    [signUp.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      toast.success(payload.message);
      state.loading = false;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    [updateMe.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [updateMe.fulfilled]: (state, { payload }) => ({
      ...state,
      user: payload.user,
      isLoggedIn: true,
    }),
    [updatePassword.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => ({
      ...state,
      user: payload.user,
      isLoggedIn: true,
      notifications: [],
    }),
  },
});

export const { logout } = authSlice.actions;
export default authSlice;

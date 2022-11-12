import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from './extraReducers';

const initialState = {
  fetching: true,
  loading: false,
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateAUser: (state, { payload }) => ({
      ...state,
      loading: false,
      users: state.users.map((el) =>
        el._id === payload.campaign._id ? payload.campaign : el
      ),
    }),
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.fetching = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => ({
      ...state,
      fetching: false,
      users: payload.users,
    }),
    [getAllUsers.rejected]: (state) => ({
      ...state,
      fetching: false,
      users: [],
    }),

    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      toast.success('User Created Successfully!');

      state.loading = false;
      state.users = state.users
        ? [...state.users, payload.user]
        : [payload.user];
    },
    [createUser.rejected]: (state) => {
      state.loading = false;
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      users: state.users.map((el) =>
        el._id === payload.user._id ? payload.user : el
      ),
    }),
    [updateUser.rejected]: (state) => {
      state.loading = false;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = state.users.filter((el) => el._id !== payload.user._id);
      toast.success('User Deleted Successfully!');
    },
    [deleteUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default usersSlice;

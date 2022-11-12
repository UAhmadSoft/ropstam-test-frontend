import { createAsyncThunk } from '@reduxjs/toolkit';
import * as usersApi from 'api/users';
import { toast } from 'react-toastify';

export const getAllUsers = createAsyncThunk(
  '/users/getAll',
  async (_, { rejectWithValue }) => {
    return usersApi
      .getAllUsers()
      .then((res) => ({ users: res.data.users }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const createUser = createAsyncThunk(
  '/users/createOne',
  async (values, { rejectWithValue }) => {
    return usersApi
      .createUser(values)
      .then((resData) => ({ user: resData.user }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const deleteUser = createAsyncThunk(
  '/users/deleteOne',
  async (id, { rejectWithValue }) => {
    return usersApi
      .deleteUser(id)
      .then((res) => ({ user: res.data.user }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const updateUser = createAsyncThunk(
  '/users/updateOne',
  async ({ id, updatedUser }, { rejectWithValue }) => {
    return usersApi
      .updateUser(id, updatedUser)
      .then((resData) => ({ user: resData.user }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

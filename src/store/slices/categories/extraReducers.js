import { createAsyncThunk } from '@reduxjs/toolkit';
import * as categoriesApi from 'api/categories';
import { toast } from 'react-toastify';

export const getAllCategories = createAsyncThunk(
  '/categories/getAll',
  async (_, { rejectWithValue }) => {
    return categoriesApi
      .getAllCategories()
      .then((res) => ({ categories: res.data.categories }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const createCategory = createAsyncThunk(
  '/categories/createOne',
  async (category, { rejectWithValue }) => {
    return categoriesApi
      .createCategory(category)
      .then((res) => ({ category: res.data.category }))
      .catch((err) => {
        console.log('err', err);
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const deleteCategory = createAsyncThunk(
  '/categories/deleteOne',
  async (id, { rejectWithValue }) => {
    return categoriesApi
      .deleteCategory(id)
      .then((res) => ({ category: res.data.category }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const updateCategory = createAsyncThunk(
  '/categories/updateOne',
  async ({ id, updatedCategory }, { rejectWithValue }) => {
    return categoriesApi
      .updateCategory(id, updatedCategory)
      .then((res) => ({ category: res.data.category }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

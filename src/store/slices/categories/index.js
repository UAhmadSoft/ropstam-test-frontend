import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from './extraReducers';

const initialState = {
  fetching: false,
  loading: false,
  categories: [],
};

const categoriesService = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.fetching = true;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => ({
      ...state,
      fetching: false,
      categories: payload.categories,
    }),
    [getAllCategories.rejected]: (state) => ({
      ...state,
      fetching: false,
      categories: [],
    }),

    [createCategory.pending]: (state) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categories = state.categories
        ? [...state.categories, payload.category]
        : [payload.category];
    },
    [createCategory.rejected]: (state) => {
      state.loading = false;
    },

    [updateCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      categories: state.categories.map((el) =>
        el._id === payload.category._id ? payload.category : el
      ),
    }),
    [updateCategory.rejected]: (state) => {
      state.loading = false;
    },

    [deleteCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (el) => el._id !== payload.category._id
      );
      toast.success('Category Deleted Successfully!');
    },
    [deleteCategory.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default categoriesService;

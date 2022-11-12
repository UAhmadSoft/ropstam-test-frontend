import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createCar, deleteCar, getAllCars, updateCar } from './extraReducers';

const initialState = {
  fetching: false,
  loading: false,
  cars: [],
};

const carsService = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCars.pending]: (state) => {
      state.fetching = true;
    },
    [getAllCars.fulfilled]: (state, { payload }) => ({
      ...state,
      fetching: false,
      cars: payload.cars,
    }),
    [getAllCars.rejected]: (state) => ({
      ...state,
      fetching: false,
      cars: [],
    }),

    [createCar.pending]: (state) => {
      state.loading = true;
    },
    [createCar.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cars = state.cars ? [...state.cars, payload.car] : [payload.car];
    },
    [createCar.rejected]: (state) => {
      state.loading = false;
    },

    [updateCar.pending]: (state) => {
      state.loading = true;
    },
    [updateCar.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      cars: state.cars.map((el) =>
        el._id === payload.car._id ? payload.car : el
      ),
    }),
    [updateCar.rejected]: (state) => {
      state.loading = false;
    },

    [deleteCar.pending]: (state) => {
      state.loading = true;
    },
    [deleteCar.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cars = state.cars.filter((el) => el._id !== payload.car._id);
      toast.success('Car Deleted Successfully!');
    },
    [deleteCar.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default carsService;

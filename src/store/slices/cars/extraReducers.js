import { createAsyncThunk } from '@reduxjs/toolkit';
import * as carsApi from 'api/cars';
import { toast } from 'react-toastify';

export const getAllCars = createAsyncThunk(
  '/cars/getAll',
  async (_, { rejectWithValue }) => {
    return carsApi
      .getAllCars()
      .then((res) => ({ cars: res.data.cars }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const createCar = createAsyncThunk(
  '/cars/createOne',
  async (car, { rejectWithValue }) => {
    return carsApi
      .createCar(car)
      .then((res) => {
        console.log('res', res);
        return { car: res.data.car };
      })
      .catch((err) => {
        console.log('err', err);
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const deleteCar = createAsyncThunk(
  '/cars/deleteOne',
  async (id, { rejectWithValue }) => {
    return carsApi
      .deleteCar(id)
      .then((res) => ({ car: res.data.car }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const updateCar = createAsyncThunk(
  '/cars/updateOne',
  async ({ id, updatedCar }, { rejectWithValue }) => {
    return carsApi
      .updateCar(id, updatedCar)
      .then((res) => ({
        car: res.data.car,
      }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from 'components/Loading';
// import Logout from 'pages/Logout';
import { useDispatch, useSelector } from 'react-redux';
import Login from 'pages/Login';
import Register from 'pages/Register';
import User from 'pages/Users';
import DashboardLayout from 'components/dashboard';
import DashboardApp from 'components/dashboard/DashboardApp';
import { logout } from 'store/slices/auth';
import { getAllUsers } from 'store/slices/users/extraReducers';
import { getAllCars } from 'store/slices/cars/extraReducers';
import { getAllCategories } from 'store/slices/categories/extraReducers';
import Cars from 'pages/Cars';
import NewCar from 'pages/NewCar';
import UpdateCar from 'pages/UpdateCar';
import Categories from 'pages/Categories';
import NewCategory from 'pages/NewCategory';
import UpdateCategory from 'pages/UpdateCategory';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return <></>;
};

const Router = () => {
  const { authenticating, isLoggedIn, user } = useSelector((st) => st.auth);

  const { users, fetching } = useSelector((st) => st.users);
  const { cars, fetching: fetchingCars } = useSelector((st) => st.cars);
  const { categories, fetching: fetchingCategories } = useSelector(
    (st) => st.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) dispatch(getAllUsers());
  }, [fetching, users]);
  useEffect(() => {
    if (fetching) dispatch(getAllCars());
  }, [fetchingCars, cars]);
  useEffect(() => {
    if (fetching) dispatch(getAllCategories());
  }, [fetchingCategories, categories]);

  if (authenticating) return <Loader />;
  return (
    <>
      {isLoggedIn && user ? (
        <Routes>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route path='app' element={<DashboardApp />} />
            <Route path='users' element={<User />} />
            <Route path='cars' element={<Cars />} />
            <Route path='cars/new' element={<NewCar />} />
            <Route path='cars/:id' element={<UpdateCar />} />

            <Route path='categories' element={<Categories />} />
            <Route path='categories/new' element={<NewCategory />} />
            <Route path='categories/:id' element={<UpdateCategory />} />
            <Route path='*' element={<Navigate to='/dashboard/app' />} />
          </Route>
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<Navigate to='/dashboard/app' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </>
  );
};

export default Router;

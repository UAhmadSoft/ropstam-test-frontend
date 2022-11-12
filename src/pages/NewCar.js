import { useEffect } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCar } from 'store/slices/cars/extraReducers';
import CarForm from 'components/CarForm';

const NewCar = () => {
  // const { users } = useSelector((st) => st.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, resetForm) => {
    dispatch(createCar({ ...values })).then(({ err }) => {
      if (!err) navigate('/dashboard/cars');
    });
  };

  return (
    <Page title='New Car'>
      <Container>
        <CarForm handleSubmit={handleSubmit} slug='Create' />
      </Container>
    </Page>
  );
};

export default NewCar;

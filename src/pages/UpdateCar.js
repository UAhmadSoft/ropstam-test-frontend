import { useEffect, useState } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createCar, updateCar } from 'store/slices/cars/extraReducers';
import CarForm from 'components/CarForm';

const UpdateCar = () => {
  const { cars } = useSelector((st) => st.cars);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [car, setCar] = useState();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const car = cars.find((c) => c.id === id);
      setCar(car);
    }
  }, [cars]);

  const handleSubmit = async (values, resetForm) => {
    dispatch(updateCar({ updatedCar: { ...values }, id })).then(({ err }) => {
      if (!err) navigate('/dashboard/cars');
    });
  };

  return (
    <Page title='Update Car'>
      <Container>
        <CarForm handleSubmit={handleSubmit} slug='Update' update car={car} />
      </Container>
    </Page>
  );
};

export default UpdateCar;

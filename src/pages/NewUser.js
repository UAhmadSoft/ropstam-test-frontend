import { useEffect } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserForm from 'components/UserForm';
import { compose } from 'redux';
import { createUser } from 'store/slices/users/extraReducers';

const NewUser = () => {
  // const { users } = useSelector((st) => st.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, resetForm) => {
    dispatch(createUser({ ...values })).then(({ err }) => {
      if (!err) navigate('/dashboard/users');
    });
  };

  return (
    <Page title='New User'>
      <Container>
        <UserForm handleSubmit={handleSubmit} slug='Create' />
      </Container>
    </Page>
  );
};

export default NewUser;

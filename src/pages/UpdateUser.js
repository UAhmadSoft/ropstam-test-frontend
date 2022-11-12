import { useEffect, useState } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from 'components/UserForm';
import { compose } from 'redux';
import { updateUser } from 'store/slices/users/extraReducers';

const UpdateUser = () => {
  const { users, loading } = useSelector((st) => st.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (loading) return;

    // console.log('users', users);
    let tmp = users && users.find((el) => el._id === id);
    // console.log('tmp', tmp);
    setUser(tmp);
  }, [users, loading]);

  const handleSubmit = async (values, resetForm) => {
    console.log('values1', values);
    dispatch(updateUser({ updatedUser: { ...values }, id })).then(({ err }) => {
      if (!err) navigate('/dashboard/users');
    });
  };

  return (
    <Page title='Update User'>
      <Container>
        {!loading && user && (
          <UserForm
            user={user}
            update
            handleSubmit={handleSubmit}
            slug='Update'
          />
        )}
      </Container>
    </Page>
  );
};

export default UpdateUser;

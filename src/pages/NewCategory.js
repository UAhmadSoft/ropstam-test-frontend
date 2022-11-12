// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CarForm from 'components/CarForm';
import { createCategory } from 'store/slices/categories/extraReducers';
import CategoryForm from 'components/CategoryForm';

const NewCategory = () => {
  // const { users } = useSelector((st) => st.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, resetForm) => {
    dispatch(createCategory({ ...values })).then(({ err }) => {
      if (!err) navigate('/dashboard/categories');
    });
  };

  return (
    <Page title='New Category'>
      <Container>
        <CategoryForm handleSubmit={handleSubmit} slug='Create' />
      </Container>
    </Page>
  );
};

export default NewCategory;

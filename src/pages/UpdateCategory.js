import { useEffect, useState } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createCategory,
  updateCategory,
} from 'store/slices/categories/extraReducers';
import CategoryForm from 'components/CategoryForm';

const UpdateCategory = () => {
  const { categories } = useSelector((st) => st.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const category = categories.find((c) => c.id === id);
      setCategory(category);
    }
  }, [categories]);

  const handleSubmit = async (values, resetForm) => {
    dispatch(updateCategory({ updatedCategory: { ...values }, id })).then(
      ({ err }) => {
        if (!err) navigate('/dashboard/categories');
      }
    );
  };

  return (
    <Page title='Update Category'>
      <Container>
        <CategoryForm
          handleSubmit={handleSubmit}
          slug='Update'
          update
          category={category}
        />
      </Container>
    </Page>
  );
};

export default UpdateCategory;

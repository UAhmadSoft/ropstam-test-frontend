import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
// material
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import * as yup from 'yup';
import logo from 'assets/download.png';
// components
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Add, CameraAlt } from '@mui/icons-material';
import { FormikTextField } from 'components/formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PREFIX = 'CategoryForm';
const classes = {
  root: `${PREFIX}-root`,
  Input: `${PREFIX}-Input`,
  CardContentBox: `${PREFIX}-CardContentBox`,
};

const StyledCard = styled(Card)({
  [`& .${classes.root}`]: {
    minWidth: 275,
    maxWidth: 800,
    margin: 'auto',
  },
  [`& .${classes.Input}`]: {
    marginBottom: '2rem',
  },
  [`& .${classes.CardContentBox}`]: {
    maxWidth: 400,
    textAlign: 'center',
    margin: 'auto',
  },
});

const validationSchema = yup.object({
  name: yup.string(`Enter Car's name`).required('Name is required!'),
});

const CategoryForm = ({ handleSubmit, slug, update, category, fetching }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((st) => st.categories);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      formik.setSubmitting(true);
    },
  });

  useEffect(() => {
    if (!update || !category) return;

    formik.setValues({
      name: category.name,
    });
  }, [category, update]);

  const handleForm = async () => {
    console.log('formik.values', formik.values);

    handleSubmit(
      {
        ...formik.values,
      }
      // formik.resetForm
    );
  };

  useEffect(() => {
    console.log('formik.errors', formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    formik.setSubmitting(loading);
  }, [loading]);

  const handleCategoryChange = (e) => {
    formik.handleBlur(e);
    console.log('e.target.value', e.target.value);
    formik.setFieldValue(e.target.name, e.target.value);
  };

  if (update && (fetching || !category)) return <div className='loader'></div>;
  return (
    <StyledCard className={classes.root}>
      <CardContent sx={{ py: 0 }}>
        <Box className={classes.CardContentBox}>
          <Typography
            variant='h4'
            textAlign='center'
            color='textprimary'
            gutterBottom
          >
            {slug} Category
          </Typography>

          <FormikTextField
            formik={formik}
            name='name'
            label='Name'
            fullWidth
            className={classes.Input}
          />
        </Box>
      </CardContent>
      <CardActions
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 30,
          paddingRight: 20,
        }}
      >
        <Button
          disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
          size='medium'
          variant='contained'
          onClick={handleForm}
          endIcon={<Add />}
        >
          {slug}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CategoryForm;

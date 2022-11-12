import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  signUp,
} from 'store/slices/auth/extraReducers';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((st) => st.auth);

  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    firstName: Yup.string().required('FirstName is required'),
    lastName: Yup.string().required('LastName is required'),
  });

  useEffect(() => {
    formik.setSubmitting(loading);
  }, [loading]);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      // console.log(`'formik.va'`, formik.values);

      dispatch(
        signUp({
          email: formik.values.email,
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
        })
      ).then(({ err }) => {
        if (!err) {
          formik.resetForm();
        }
      });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete='username'
            label='First Name'
            {...getFieldProps('firstName')}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            fullWidth
            autoComplete='username'
            label='Last Name'
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <TextField
            fullWidth
            autoComplete='username'
            type='email'
            label='Email address'
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>

        <Box my={2} />
        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

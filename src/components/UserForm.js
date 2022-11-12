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

const PREFIX = 'UserForm';
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
const userRoles = [
  { name: 'User Manager', value: 'userManager' },
  { name: 'Document Manager', value: 'documentManager' },
  { name: 'User', value: 'user' },
];
const validationSchema = yup.object({
  name: yup.string(`Enter User's name`).required('FirstName is required!'),
  email: yup.string(`Enter User's Email`).required('Email is required!'),
});

const UserForm = ({ handleSubmit, slug, update, user, fetching }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((st) => st.users);
  const [photo, setPhoto] = useState('');

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      avatar: [],
      role: userRoles[0].value,
      downloadPermissions: false,
      uploadPermissions: false,
      deletePermissions: false,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      formik.setSubmitting(true);
    },
  });

  useEffect(() => {
    if (!update || !user) return;

    formik.setValues({
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      role: user.role,
      downloadPermissions: user.downloadPermissions,
      uploadPermissions: user.uploadPermissions,
      deletePermissions: user.deletePermissions,
    });
    setPhoto(user.avatar);
  }, [user, update]);
  const handlePhoto = async (e) => {
    formik.setFieldValue('avatar', e.target.files[0]);
    const convert64 = await base64(e.target.files[0]);
    setPhoto(convert64);
  };
  const handleForm = async () => {
    console.log('formik.values', formik.values);

    handleSubmit(
      {
        ...formik.values,
      }
      // formik.resetForm
    );
  };
  const base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  useEffect(() => {
    console.log('formik.errors', formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    formik.setSubmitting(loading);
  }, [loading]);

  const handleImageUpload = async (e, toggleFunc, cb) => {
    toggleFunc?.();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          //console.log(`result onLoadEnd`, e.target.result);
          const file = e.target.result;

          // TODO  Delete Image from cloudinary if it exists on this user

          // // * 1 Upload Image on Cloudinary
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const uploadedImage = {
            url: res.data.secure_url,
            asset_id: res.data.asset_id,
            public_id: res.data.public_id,
          };
          console.log(`res`, res);

          cb(uploadedImage);
          toggleFunc?.();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      console.log(`err`, err);
    }
  };

  const handleRole = (e) => {
    formik.handleBlur(e);
    console.log('e.target.value', e.target.value);
    formik.setFieldValue(e.target.name, e.target.value);
  };

  if (update && (fetching || !user)) return <div className='loader'></div>;
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
            {slug} User
          </Typography>
          <Box>
            <Typography variant='h5'>Avatar</Typography>
            <img
              src={photo || user?.avatar || logo}
              style={{ width: 200, height: 200 }}
              alt={user?.name || 'User'}
            />

            <input
              style={{ display: 'none' }}
              id='avatar'
              name='avatar'
              type='file'
              onChange={handlePhoto}
            />
            <label htmlFor='avatar' style={{ cursor: 'pointer' }}>
              <CameraAlt />
            </label>
          </Box>
          <FormikTextField
            formik={formik}
            name='name'
            label='FullName'
            fullWidth
            className={classes.Input}
          />
          <FormikTextField
            formik={formik}
            name='email'
            label='Email'
            fullWidth
            type='email'
            className={classes.Input}
          />

          <FormControl fullWidth>
            <InputLabel id='role-input'>User Role</InputLabel>
            <Select
              labelId='role-input'
              id='role'
              value={formik.values.role}
              className={classes.Input}
              label='User Role'
              onChange={handleRole}
              name='role'
              defaultValue={user ? user.role : userRoles[0].value}
            >
              {userRoles.map((el) => (
                <MenuItem key={el.value} value={el.value}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='downloadPermissions'>
              Download Permission
            </InputLabel>
            <Select
              labelId='downloadPermissions'
              id='downloadPermissions1'
              value={formik.values.downloadPermissions}
              className={classes.Input}
              label='Download Permission'
              onChange={handleRole}
              name='downloadPermissions'
              defaultValue={user ? user.downloadPermissions : 'not-allow'}
            >
              <MenuItem value={'allow'}>{'Allow'}</MenuItem>
              <MenuItem value={'not-allow'}>{'Not Allow'}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='uploadPermissions'>Upload Permissions</InputLabel>
            <Select
              labelId='uploadPermissions'
              id='uploadPermissions1'
              value={formik.values.uploadPermissions}
              className={classes.Input}
              label='Upload Permissions'
              onChange={handleRole}
              name='uploadPermissions'
              defaultValue={user ? user.uploadPermissions : 'not-allow'}
            >
              <MenuItem value={'allow'}>{'Allow'}</MenuItem>
              <MenuItem value={'not-allow'}>{'Not Allow'}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='deletePermissions'>Delete Permissions</InputLabel>
            <Select
              labelId='deletePermissions'
              id='deletePermissions1'
              value={formik.values.deletePermissions}
              className={classes.Input}
              label='Delete Permissions'
              onChange={handleRole}
              name='deletePermissions'
              defaultValue={user ? user.deletePermissions : 'not-allow'}
            >
              <MenuItem value={'allow'}>{'Allow'}</MenuItem>
              <MenuItem value={'not-allow'}>{'Not Allow'}</MenuItem>
            </Select>
          </FormControl>
          {slug !== 'Update' && (
            <>
              <FormikTextField
                formik={formik}
                name='password'
                label='Password'
                fullWidth
                type='password'
                className={classes.Input}
              />
              <FormikTextField
                formik={formik}
                name='passwordConfirm'
                label='Password Confirm'
                type='password'
                fullWidth
                className={classes.Input}
              />
            </>
          )}
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

export default UserForm;

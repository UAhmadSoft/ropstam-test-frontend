import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from 'utils/axios';
import { toast } from 'react-toastify';
import { FormikTextField } from 'components/formik';
import { Add, Cancel, Mail } from '@mui/icons-material';

const validationSchema = yup.object({
  subject: yup.string(`enter subject`).required('Title is required!'),
  message: yup.string(`enter message`).required('Message is required!'),
});

const SendEmail = ({ open, toggleDialog, email = '' }) => {
  const formik = useFormik({
    initialValues: {
      subject: '',
      message: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        const res = await api.post(`/users/emails/${email}`, {
          ...values,
        });
        // console.log('res', res);
        toast.success('Email Sent Successfully');
        formik.resetForm();
        toggleDialog();
      } catch (err) {
        toast.error(
          err.response?.data?.message || err.message || 'Something Went Wrong!'
        );
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} toggleDialog={toggleDialog}>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <FormikTextField
          formik={formik}
          name='subject'
          label='Title'
          fullWidth
          // className={classes.Input}
          style={{
            marginBottom: '1rem',
            marginTop: '1rem',
          }}
        />
        <FormikTextField
          formik={formik}
          name='message'
          label='Message'
          fullWidth
          // className={classes.Input}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
          variant='contained'
          color='success'
          onClick={formik.handleSubmit}
          endIcon={<Mail />}
          style={{ color: '#fff' }}
        >
          Send Email
        </Button>
        <Button
          onClick={toggleDialog}
          variant='contained'
          color='error'
          endIcon={<Cancel />}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendEmail;

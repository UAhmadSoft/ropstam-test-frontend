import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  FormikAutoComplete,
  FormikHelpers,
  FormikTextField,
} from 'components/formik';
import { Add, CameraAlt, Cancel } from '@mui/icons-material';
import { CircularProgress, MenuItem, Select } from '@mui/material';

const validationSchema = yup.object({
  title: yup.string(`Enter User's name`).required('Title is required!'),
  // document: yup
  //   .string('Choose the document to upload')
  //   .required('Choose the document to upload'),
});

const NewDocumentDialog = ({
  toggleDialog,
  open,
  saveFileInfo,
  document,
  operation = 'create',
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      document: '',
      isPrivate: false,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      formik.setSubmitting(true);
    },
  });

  const handleFileUpload = (e) => {
    // formik.handleBlur();
    console.log(e.target.files[0]);
    formik.setFieldValue('document', e.target.files[0]);
  };

  const handleForm = async () => {
    formik.setSubmitting(true);
    saveFileInfo(
      {
        ...formik.values,
      },
      () => {
        formik.setSubmitting(false);
      }
      // formik.resetForm
    );
  };

  useEffect(() => {
    if (operation === 'create' || !document) return;

    formik.setValues({
      description: document.description,
      title: document.title,
      isPrivate: document.isPrivate,
    });
  }, [operation, document]);

  const handleFormikChange = (e) => FormikHelpers.handleTxtChange(e, formik);

  return (
    <div>
      <Dialog fullWidth={true} maxWidth='sm' open={open} onClose={toggleDialog}>
        <DialogTitle>Document to Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the document to upload with info
          </DialogContentText>
          <FormikTextField
            formik={formik}
            name='title'
            label='Title'
            fullWidth
            style={{
              marginBlock: '1.5rem',
            }}
          />
          <FormikTextField
            formik={formik}
            name='description'
            label='Description'
            multiline
            rows={2}
            fullWidth
            style={{
              marginBottom: '1rem',
            }}
          />

          <TextField
            name='document'
            value={formik.values.document?.name || 'No document Choosen'}
            label='Document'
            disabled
            fullWidth
            style={{
              marginBottom: '1rem',
            }}
          />
          <Select
            label='Scope'
            fullWidth
            onChange={handleFormikChange}
            name='isPrivate'
            error={formik.touched.isPrivate && Boolean(formik.errors.isPrivate)}
            helpertext={formik.touched.isPrivate && formik.errors.isPrivate}
            value={Boolean(formik.values.isPrivate)}
          >
            <MenuItem value={false}>Public</MenuItem>
            <MenuItem value={true}>Private</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions sx={{ gap: '1rem' }}>
          <input
            // disabled={uploading}
            type='file'
            id='fileUpload'
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          <label htmlFor='fileUpload'>
            <Button color='secondary' component='span' variant='contained'>
              Upload Document
            </Button>
          </label>

          <Button
            disabled={
              !formik.dirty ||
              !formik.isValid ||
              formik.isSubmitting ||
              (!formik.values.document && operation === 'create')
            }
            variant='contained'
            onClick={handleForm}
            endIcon={<Add />}
          >
            Save Document
            {formik.isSubmitting && (
              <CircularProgress size={25} sx={{ marginLeft: 2 }} />
            )}
          </Button>
          <Button
            variant='contained'
            endIcon={<Cancel />}
            color='error'
            onClick={toggleDialog}
            sx={{ marginLeft: '0 !important' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewDocumentDialog;

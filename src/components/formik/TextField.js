import { TextField } from '@mui/material';
import React from 'react';
import { FormikHelpers } from '.';

const FormikTextField = ({
  formik,
  name,
  placeholder = '',
  type = 'text',
  fullWidth,
  label,
  className,
  multiline = false,
  minRows = 0,
  style = {},
}) => {
  const handleChange = (e) => FormikHelpers.handleTxtChange(e, formik);
  return (
    <TextField
      className={className}
      variant='outlined'
      value={formik.values[name]}
      name={name}
      label={label}
      onChange={handleChange}
      type={type}
      multiline={multiline}
      placeholder={placeholder}
      minRows={minRows}
      fullWidth={Boolean(fullWidth)}
      style={style}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helpertext={formik.touched[name] && formik.errors[name]}
      onBlur={formik.handleBlur}
    />
  );
};

export default FormikTextField;

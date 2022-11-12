import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import React from 'react';
import { FormikHelpers } from '.';

const CheckBox = ({ formik, name, fullWidth, label, classes, style = {} }) => {
  const handleChange = (e) => FormikHelpers.handleCheckBoxChange(e, formik);
  // console.log('formik.values.', name, formik.values[name]);
  return (
    <FormControl fullWidth={fullWidth} style={style}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={Boolean(formik.values[name])}
            onChange={handleChange}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default CheckBox;

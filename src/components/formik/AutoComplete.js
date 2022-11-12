import React from 'react';

import { TextField, Checkbox } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { handleAutoCompleteChange } from 'components/formik/helpers';

function FormikAutoComplete({
  lajbel,
  name,
  formik,
  isDisabled = false,
  options = [],
  label = '',
}) {
  return (
    <Autocomplete
      disablePortal
      id={name}
      options={options}
      value={formik.values[name] || ''}
      disabled={isDisabled}
      onChange={(e, val) => handleAutoCompleteChange(e, val, name, formik)}
      getOptionLabel={(el) => el.name || ''}
      sx={{ width: 300 }}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helpertext={formik.touched[name] && formik.errors[name]}
      onBlur={formik.handleBlur}
      renderInput={(params) => (
        <TextField name={name} {...params} label={label} />
      )}
    />
  );
}

export default FormikAutoComplete;

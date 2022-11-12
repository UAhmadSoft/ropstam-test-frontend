import React from 'react';

import { TextField, Checkbox } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const AutoComplete = ({
  options = [],
  isDisabled = false,
  handleChange,
  formik,
  objectValue,
  placeholder = '',
  multiple = false,
  renderCheckbox = false,
}) => {
  const handleOnChange = (e, value) => {
    handleChange(e, value, objectValue);
  };
  return (
    <Autocomplete
      multiple={multiple}
      id={objectValue}
      options={options}
      disabled={isDisabled}
      value={formik.values[objectValue]}
      getOptionLabel={(option) => option.name}
      onChange={handleOnChange}
      disableCloseOnSelect
      error={formik.touched[objectValue] && Boolean(formik.errors[objectValue])}
      helpertext={formik.touched[objectValue] && formik.errors[objectValue]}
      onBlur={formik.handleBlur}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          {renderCheckbox && (
            <Checkbox
              icon={icon}
              name={objectValue}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
          )}
          {option.name}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          value={formik.values[objectValue]}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default AutoComplete;

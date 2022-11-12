export const handleTxtChange = (e, formik) => {
  formik.handleChange(e);
  formik.handleBlur(e);
};

export const handleAutoCompleteChange = (e, value = '', key, formik) => {
  // console.log('value', value);
  formik.setFieldValue(key, value);
  formik.handleBlur(e);
};

export const handleCheckBoxChange = (e, formik) => {
  formik.setFieldValue(e.target.name, e.target.checked);
  formik.handleBlur(e);
};

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ConfirmDelete = ({
  open,
  toggleDialog,
  title = 'Confirm Delete',
  handleSuccess,
}) => {
  const { loading } = useSelector((st) => st.users);
  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          sx={{ color: '#fff' }}
          variant='contained'
          color='success'
          onClick={handleSuccess}
        >
          Delete {loading && <CircularProgress style={{marginLeft : 10}} size={25} /> }
        </Button>
        <Button variant='contained' color='error' onClick={toggleDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;

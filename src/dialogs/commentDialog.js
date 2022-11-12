import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useTextInput } from 'hooks';
import React from 'react';

const CommentDialog = ({ open, toggleDialog, handleSubmit }) => {
  const [text, handleTextChange, reset] = useTextInput('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Comment</DialogTitle>
      <DialogContent sx={{ minWidth: '600px' }}>
        <form id='form' onSubmit={handleOnSubmit}>
          <TextField
            type='text'
            fullWidth
            sx={{ my: 1 }}
            required
            value={text}
            onChange={handleTextChange}
            label='Comment'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' type='submit' form='form'>
          Create
        </Button>
        <Button variant='contained' color='error' onClick={toggleDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDialog;

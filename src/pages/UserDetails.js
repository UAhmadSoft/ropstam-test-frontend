import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

const UserDetailsDialog = ({ user = {}, open, toggleDialog }) => {
  return (
    <Dialog
      open={open}
      onClose={toggleDialog}
      sx={{
        '& .MuiPaper-root': {
          width: 450,
        },
      }}
    >
      <DialogTitle>{user.name}</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Avatar
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.name}`
          }
          alt='user avatar'
        />

        <TextField
          id='outlined-read-only-input'
          label='Name'
          defaultValue={user.name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='outlined-read-only-input'
          label='Email'
          defaultValue={user.email}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='outlined-read-only-input'
          label='About'
          defaultValue={user.about}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='outlined-read-only-input'
          label='Phone'
          defaultValue={user.phoneNumber}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;

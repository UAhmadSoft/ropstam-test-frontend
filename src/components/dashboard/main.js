import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Comment, Share } from '@mui/icons-material';

const opportunities = [
  {
    _id: 1,
    img: '',
    title: 'UX/UI Designer',
    company: 'Upwork',
    location: 'Remote Only',
    description: `On Upwork You'll find  a range of top freelancers and agencies from developers
   and development agencies to desingers and creative agencies copywriters`,
  },
  {
    _id: 2,
    img: '',
    title: 'Product Designer',
    company: 'Facebook',
    location: 'CA ,USA',
    description: `Founded in 2004, Facebook's mission is to give people the power to build`,
  },
  {
    _id: 3,
    img: '',
    title: 'PartTime UX/UI Designer',
    company: 'Google',
    location: 'Remote Only',
    description: `Search the world's information including webpages, images, videos and more.`,
  },
  {
    _id: 4,
    img: '',
    title: 'UI Designer',
    company: 'Instagram',
    location: 'CA USA',
    description: `Instagram is a photo and video sharing social networking service owned by Facebook Inc.`,
  },
];

const timelines = [
  {
    _id: 1,
    task: 'Create Wireframe',
    status: 'pending',
    comments: [],
    shares: [],
  },
  {
    _id: 2,
    task: 'Slack Logo Design',
    status: 'pending',
    comments: [1, 2, 3],
    shares: [2, 4, 1, 2, 3],
  },
  {
    _id: 3,
    task: 'Dashboard Design',
    status: 'pending',
    comments: [],
    shares: [2, 3, 1, 3, 1],
  },
  {
    _id: 4,
    task: 'Create Wireframe',
    status: 'completed',
    comments: [],
    shares: [],
  },
  {
    _id: 5,
    task: 'Create Wireframe',
    status: 'completed',
    comments: [],
    shares: [],
  },
];

const Main = () => {
  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={7.5}
          sx={{
            border: '1px solid #ccc',
            p: 2,
            borderRadius: '20px',
            height: '400px',
            overflowY: 'auto',
          }}
        >
          <Typography variant='h5'>Opportunities</Typography>
          {opportunities.map((el) => (
            <Box
              key={el._id}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <Box flexBasis='50%' flexGrow={1}>
                <img
                  src={el.img}
                  alt='img'
                  style={{ width: 100, height: 70 }}
                />
                <Box display='flex' flexDirection='column' rowGap='5px'>
                  <Typography variant='body1' fontWeight='bold'>
                    {el.title}
                  </Typography>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    maxWidth='200px'
                  >
                    <Typography variant='body2'>{el.company}</Typography>
                    <Typography variant='body2'>{el.location}</Typography>
                  </Box>
                  <Typography variant='body2'>{el.description}</Typography>
                </Box>
              </Box>
              <Box display='flex' flexWrap='wrap' gap={1}>
                <Button size='small' variant='contained' color='error'>
                  Create
                </Button>
                <Button
                  size='small'
                  variant='contained'
                  sx={{ color: '#fff' }}
                  color='success'
                >
                  Add To Watchlist
                </Button>
                <Button size='small' variant='contained' color='primary'>
                  More
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={0} sm={0.5} />
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            border: '1px solid #ccc',
            p: 2,
            borderRadius: '20px',
            height: '400px',
            overflowY: 'auto',
          }}
        >
          <Typography variant='h5'>Timelines You Set</Typography>
          <List>
            {timelines.map((el, idx) => (
              <ListItem
                key={el._id}
                secondaryAction={
                  <IconButton edge='end' aria-label='comments'>
                    {el.status === 'pending' ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <CheckCircleIcon color='success' />
                    )}
                  </IconButton>
                }
              >
                <Typography variant='body1' sx={{ marginRight: 4 }}>
                  {idx < 10 && 0}
                  {idx}
                </Typography>
                <ListItemText primary={el.task} />
                {el.comments.length > 0 && (
                  <Box
                    sx={{
                      marginLeft: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography variant='body1'>
                      {el.comments.length}
                    </Typography>
                    <Comment fontSize='small' />
                  </Box>
                )}
                {el.shares.length > 0 && (
                  <Box
                    sx={{
                      marginLeft: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography variant='body1'>{el.shares.length}</Typography>
                    <Share fontSize='small' />
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;

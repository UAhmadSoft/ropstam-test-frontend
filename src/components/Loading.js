import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import { WaveTopBottomLoading } from 'react-loadingg';

const Loading = ({ noTitle }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        className='cPhARM'
        style={{
          margin: 'auto',
          position: 'absolute',
          inset: 0,
          minWidth: 'fit-content',
          transform: 'translateY(-40px)',
        }}
      >
        {!noTitle && (
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* <Typography variant="h3" color="primary" component="span">
              Royal Thai{' '}
            </Typography>
            <Typography variant="h3" color="primary" component="span">
              Spa
            </Typography> */}
          </Box>
        )}
      </Box>
      <WaveTopBottomLoading color={theme.palette.primary.main} />
    </Box>
  );
};

export default Loading;

import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography, Box } from '@mui/material';
import { graycolor } from '../constants/color';

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: graycolor,
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='h5'
        sx={{
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        Select a friend to chat
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);

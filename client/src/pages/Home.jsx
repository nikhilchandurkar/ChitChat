import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography } from '@mui/material';
import { graycolor } from '../constants/color';

const Home = () => {
  return (

    <div style={{
      backgroundColor:graycolor,
      height:"100%"
    }}>
      <Typography 
       variant='h5' p={"2rem"}
       >
        Select a friend to chat
      </Typography>
    </div>
  )
}
export default AppLayout()(Home);


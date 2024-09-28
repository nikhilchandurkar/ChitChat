import React from 'react'
import Header from './Header';
import { Grid } from '@mui/material';
import Home from '../../pages/Home';
import ChatList from '../specific/ChatList';
import sampleChats from '../../constants/sampleData'
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';


const AppLayout = () => (WrappedComponent) => {

  return (props) => {
    const params = useParams
    const chatId = params.chatId;
    const handleDeleteChats = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("deleteChat", _id, groupChat);
    }

    return (
      <>
        <title title='chat App' />
        <Header />
        {/* app layout */}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid item height={"100%"}

            sm={4}
            md={3}
            lg={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >

            <ChatList
              handleDeleteChat={handleDeleteChats}
              chats={sampleChats}
              chatId={chatId}
              onlineUsers={["0", "1", "2", "3"]}

            />

          </Grid>

          <Grid item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
          >
            <WrappedComponent {...props} />


          </Grid>

          <Grid item height={"100%"}
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,1)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>

      </>

    )

  }
}

export default AppLayout;

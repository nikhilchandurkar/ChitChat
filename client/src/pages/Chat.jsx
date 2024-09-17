import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material';
import { graycolor, orange } from '../constants/color';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon
} from '@mui/icons-material';
import Filemenu from '../components/dialogs/Filemenu';
import { sampleMessages } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: "78965",
  name: "Nikkkkkkkiiiii"  
}


const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        // bgcolor
        bgcolor={graycolor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >

        {
          sampleMessages.map((i) => (
            <MessageComponent 
            key={i._id}
            message={i}
              user={user}
              
            />
          ))}

      </Stack>
      <form
        style={{
          height: "10%",

        }}
      >
        <Stack direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >


          <IconButton sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "-30deg",
            color: "secendory.main",
            "&:hover": {
              bgcolor: "secendory.dark"
            }
          }}>
            <AttachFileIcon />
          </IconButton>

          {/* <InputBox  placeholder='Type a message here.....' /> */}
          <input
            placeholder='....'
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 3rem",
              borderRadius: "1.5rem",
              backgroundColor: graycolor,

            }}
          >
          </input>

          <IconButton type='submit'
            sx={{
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark"
              }
            }}
          >
            <SendIcon />
          </IconButton >
        </Stack>
      </form>
      <Filemenu />

    </>
  )
}
export default AppLayout()(Chat);


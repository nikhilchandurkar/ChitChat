import React, { useState, useRef } from 'react'
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
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message logic here, e.g., updating state or API call
      console.log("Message Sent: ", message);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={graycolor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessages.map((i) => (
          <MessageComponent 
            key={i._id}
            message={i}
            user={user}
          />
        ))}
      </Stack>

      <form
        onSubmit={handleSubmit}
        style={{
          height: "10%",
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"} flex={1}>
          <IconButton sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "-30deg",
            color: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.dark"
            }
          }}>
            <AttachFileIcon />
          </IconButton>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message here..."
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 3rem",
              borderRadius: "1.5rem",
              backgroundColor: graycolor,
            }}
          />

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
          </IconButton>
        </Stack>
      </form>

      <Filemenu />
    </>
  );
};

export default AppLayout()(Chat);

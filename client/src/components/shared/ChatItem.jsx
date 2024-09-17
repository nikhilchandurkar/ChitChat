import React, { memo } from 'react'
import { Link, } from "../styles/StyledComponents"
import { Stack } from '@mui/system'
import { Typography, Box } from '@mui/material'
import AvatarCard from './AvatarCard'

const ChatItem = (
  {
    avatar = [],
    name,
    _id,
    groupchat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handelDeletChat,
  }
) => {
  return (
    <div>
      <Link
        sx={{padding:"0"}}
        to={`/chat/${_id}`}
        onContextMenu={(e) => handelDeletChat(e, _id, groupchat)}>
        <div
          style={{
            display: "flex",
            padding: "1rem",
            alignItems: "center",
            backgroundColor: sameSender? "black" :"unset",
            color: sameSender? "black" : "unset",
            borderRadius: "5px",
            position: "relative", 
              
          
          }}>
          <AvatarCard avatar={avatar} />

          <Stack sx={{p:"0"}}>
            <Typography color={"black"} >
              {name}
            </Typography>
            {newMessageAlert && (
              <Typography>{newMessageAlert.count} New Nessage</Typography>
            )}

          </Stack>
          {isOnline && (<Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "10px",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              Transform: "translateY(-50%)",
              
            }}
          />
          )}
        </div>
      </Link>
    </div>
  )
}

export default memo(ChatItem);

import React, { memo } from 'react';
import { Link } from "../styles/StyledComponents";
import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import AvatarCard from './AvatarCard';

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupchat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: "0" }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupchat)}
      aria-label={`Chat with ${name}`}
    >
      <div
        style={{
          display: "flex",
          padding: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "#f0f0f0" : "unset",
          color: sameSender ? "black" : "unset",
          borderRadius: "5px",
          position: "relative",
        }}
        role="listitem"  // added role for better accessibility
      >
        {/* Avatar section */}
        <AvatarCard avatar={avatar} />

        {/* Chat info */}
        <Stack sx={{ p: "0" }}>
          <Typography color="black">
            {name}
          </Typography>
          
          {newMessageAlert && (
            <Typography color="primary" fontWeight="bold">
              {newMessageAlert.count} New Message{newMessageAlert.count > 1 ? 's' : ''}
            </Typography>
          )}
        </Stack>

        {/* Online status indicator */}
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
            aria-label="User is online"
            role="status"
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);

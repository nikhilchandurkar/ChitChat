import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { sampleNotifcations } from '../../constants/sampleData';

const Notifications = () => {
  const friendRequestHandler = ({ _id, accept }) => {
    // handle friend request
    console.log(_id, accept);
  };

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"}>
        <DialogTitle align='center'>Notifications</DialogTitle>
        {sampleNotifcations.length > 0 ? (
          sampleNotifcations.map((notification) => (
            <NotificationItem
              notification={notification}
              sender={notification.sender}
              handler={friendRequestHandler}
              key={notification._id}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar src={avatar} alt={`${name}'s avatar`} />
        <Typography
          variant='body1'
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={"1px"}>
          <Button
            onClick={() => handler({ _id, accept: true })}
            variant='text'
            color='primary'
          >
            Accept
          </Button>
          <Button
            color='error'
            variant='text'
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;

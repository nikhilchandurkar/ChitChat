import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import {
    Face as FaceIcon,
    AlternateEmail as UsernameIcon,
    CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar
                alt="User Profile Picture" // Added alt for accessibility
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    marginBottom: "1rem",
                    border: "5px solid white",
                }}
            />
            <ProfileCard heading={"Bio"} text={"It's me"} />

            <ProfileCard
                heading={"Username"}
                text={"nikhilChandurkar"}
                Icon={UsernameIcon}
            />

            <ProfileCard
                heading={"Name"}
                text={"Nikhil Chandurkar"}
                Icon={FaceIcon}
            />

            <ProfileCard
                heading={"Joined"}
                text={moment("2024-08-15T00:00:00.000Z").fromNow()}
                Icon={CalendarIcon}
            />
        </Stack>
    );
};

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        color={"white"}
        textAlign={"center"}
    >
        {Icon && <Icon />}
        <Stack>
            <Typography variant='body1' fontWeight={500}>
                {text}
            </Typography>
            <Typography variant='caption' color={"gray"}>
                {heading}
            </Typography>
        </Stack>
    </Stack>
);

export default Profile;

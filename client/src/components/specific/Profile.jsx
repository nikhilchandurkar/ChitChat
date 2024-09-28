import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import {
    Face as FaceIcon, // Fixed typo
    AlternateEmail as UsernameIcon,
    CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    marginBottom: "1rem", // Fixed extra space issue
                    border: "5px solid white",
                }}
            />
            <ProfileCard heading={"bio"} text={"its me"} />

            <ProfileCard
                heading={"username"}
                text={"nikhilChandurkar"}
                Icon={UsernameIcon}
            />

            <ProfileCard
                heading={"Name"}
                text={"Nikhil Chandurkar"}
                Icon={FaceIcon} // Corrected typo
            />

            <ProfileCard
                heading={"joined"}
                text={moment("2024-08-15T00:00:00.000Z").fromNow()}
                Icon={CalenderIcon}
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
        {Icon && <Icon />} {/* Ensure Icon is rendered only if it exists */}
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography variant='caption' color={"gray"}>{heading}</Typography>
        </Stack>
    </Stack>
);

export default Profile;

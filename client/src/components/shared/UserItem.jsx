import React, { memo } from 'react';
import {
    Avatar,
    IconButton,
    ListItem,
    Stack,
    Typography
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import PropTypes from 'prop-types'; // For prop validation

const UserItem = ({ user, handler, handlerIsLoading }) => {
    const { name, _id, avatar, isAdded } = user;

    return (
        <ListItem>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
                <Avatar src={avatar} alt={name} /> {/* Display the user's avatar */}
                <Typography
                    variant='body1'  // Corrected Typography variant
                    sx={{
                        flexGrow: 1, // Fixed the typo `flexGlow` to `flexGrow`
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: 'nowrap',
                        width: "100%",
                    }}
                >
                    {name}
                </Typography>
                <IconButton
                    size='small'
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor: isAdded ? "error.dark" : "primary.dark"
                        }
                    }}
                    onClick={() => handler(_id)}
                    disabled={handlerIsLoading}
                >
                    {isAdded ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
            </Stack>
        </ListItem>
    );
};

// PropTypes for validation
UserItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        avatar: PropTypes.string,  // Optional, should be a URL to the avatar image
        isAdded: PropTypes.bool.isRequired
    }).isRequired,
    handler: PropTypes.func.isRequired,
    handlerIsLoading: PropTypes.bool.isRequired
};

export default memo(UserItem);

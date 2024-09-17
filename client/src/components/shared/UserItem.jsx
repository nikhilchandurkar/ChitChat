import { React, memo } from 'react'
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"
// search a user 
const UserItem = ({ user, handler, handlerIsLoading,  }) => {
    const { name, _id, avatar,isAdded } = user
    return (
        <ListItem>
            <Stack direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}

            >
                <Avatar />
                <Typography
                    variant='body'
                    sx={{
                        flexGlow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: 'nowrap',
                        width: "100%",
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
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
                    {
                        isAdded ? <RemoveIcon /> : <AddIcon />
                    }

                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem);

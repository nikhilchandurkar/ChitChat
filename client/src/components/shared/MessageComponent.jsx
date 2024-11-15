import { Box, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { lightblue } from '../../constants/color';
import moment from 'moment';
import { fileFormat } from '../../lib/feature';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user?._id;

    const timeAgo = moment(createdAt).fromNow();
    console.log(attachments);

    return (
        <div
            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                width: "fit-content",
                padding: "0.5rem", // Added padding for better appearance
            }}
        >
            {/* Display sender name only if not the same sender */}
            {!sameSender && (
                <Typography color={lightblue} fontWeight={"600"} variant='caption'>
                    {sender.name}
                </Typography>
            )}

            {/* Display message content */}
            {content && (
                <Typography variant='body1'>{content}</Typography>
            )}

            {/* Render attachments if any */}
            {attachments.length > 0 && attachments.map((attachment, index) => {
                const url = attachment.url;
                const file = fileFormat(url); // Determine the file type based on the URL
                return (
                    <Box key={index}>
                        <a href={url} target='_blank' rel="noopener noreferrer" download>
                            {/* Pass props to RenderAttachment */}
                            <RenderAttachment file={file} url={url} />
                        </a>
                    </Box>
                );
            })}

            {/* Display time of message */}
            <Typography fontSize={"small"} variant='caption' color={"text.secondary"}>
                {timeAgo}
            </Typography>
        </div>
    );
}

export default memo(MessageComponent);

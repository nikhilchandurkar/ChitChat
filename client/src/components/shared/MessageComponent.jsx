import { Box, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { lightblue } from '../../constants/color'
import moment from 'moment'
import { fileFormat } from '../../lib/feature'
import RenderAttachment from './RenderAttachment'

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user?._id

    const timeAgo = moment(createdAt).fromNow()
    console.log(attachments)


    return (
        <div

            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                // padding: "",
                width: "fit-content"
            }}
        >

            {!sameSender && (
                <Typography color={lightblue} fontWeight={"600"} variant='caption'>{sender.name}
                </Typography>
            )}

            {content &&
                <Typography variant='body1' >{content}</Typography>
            }
            {
                attachments.length > 0 && attachments.map((attachment, index) => {
                    const url = attachment.url
                    const file = fileFormat(url)
                    return <Box key={index}>
                        <a href={url} target='_blank' download
                            color='black'
                        >

                            {RenderAttachment(file, url)}

                        </a>
                    </Box>
                })
            }

            <Typography fontStyle={""} fontSize={"small"} variant='caption' color={"text.secondary"}>
                {timeAgo}
            </Typography>




        </div>
    )
}

export default memo(MessageComponent)




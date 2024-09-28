import React from 'react'
import { transformImage } from '../../lib/feature';
import { FileOpen as FileOpenIcon } from "@mui/icons-material"

const RenderAttachment = ({ file, url }) => {
    console.log(file)

    switch (file) {
        case "video":
            return <video src={url} preload='none' width={"200px"} controls />

        case "audio":
            return <audio src={url} preload='none' controls />

        case "image":
            return <img 
                src={transformImage(url, 200)}
                alt={"attachment"}
                width={"200px"}
                height={"150px"}
                style={{
                    objectFit: "contain",
                }}
            />

        default:
            return <FileOpenIcon />
    }
}

export default RenderAttachment;

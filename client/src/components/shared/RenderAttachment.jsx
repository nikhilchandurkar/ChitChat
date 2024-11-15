import React from 'react';
import { transformImage } from '../../lib/feature';
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = ({ file, url, size = { width: "200px", height: "150px" } }) => {
    console.log(file);

    const renderImage = (url) => {
        try {
            return <img 
                src={transformImage(url, 200)} 
                alt="Image attachment" 
                width={size.width} 
                height={size.height} 
                style={{
                    objectFit: "contain",
                }} 
            />;
        } catch (error) {
            console.error('Error transforming image:', error);
            return <img src={url} alt="Image attachment" width={size.width} height={size.height} />;
        }
    };

    switch (file) {
        case "video":
            return <video src={url} preload='none' width={size.width} controls />;
        case "audio":
            return <audio src={url} preload='none' controls />;
        case "image":
            return renderImage(url);
        default:
            return (
                <div>
                    <FileOpenIcon />
                    <p>Unsupported file type</p>
                </div>
            );
    }
};

export default RenderAttachment;

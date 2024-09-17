import React from 'react'
import { styled } from '@mui/system';
import { Link as LinkComponent } from "react-router-dom"
import { graycolor } from '../../constants/color';


export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0 )",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whitespaces: "nowrap",
    width: 1
});

export const Link = styled(LinkComponent)`
text-decoration: none;
color:black,
padding:1 rem,
&:hover {
background-color:rgba(0,0,0,0.1);
}
`;
// export const Link =styled(LinkComponent)(
//     {
//         textDecoration:"none",
//         color:"black",
//         padding:"1 rem",
//         hover: {
//             "&:hover": {
//               bgcolor: 'rgb(0,0,0,0.1)'
//             }
//           }
//     }
// )

// it does not work properly
export const InputBox = styled("input")`
width: 200%
height: 100%
border: none,
outline: none,
padding:0 3rem,
border-radius:  1.5rem,
background-color:${graycolor},
`;
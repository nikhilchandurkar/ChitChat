import { Avatar, AvatarGroup, Box, Stack } from '@mui/material';
import React from 'react';
import { transformImage } from '../../lib/feature';

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
        <Box sx={{ width: "5rem", height: "3rem", position: "relative" }}>
          {avatar.map((i, index) => (
            <Avatar
              key={i._id || index}  // Assuming `i` has an `_id` for uniqueness
              src={transformImage(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "2rem",   // Corrected typo by removing the space between `2` and `rem`
                height: "2rem",
                position: "absolute",
                left: `${0.5 + index}rem`,
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
}

export default AvatarCard;

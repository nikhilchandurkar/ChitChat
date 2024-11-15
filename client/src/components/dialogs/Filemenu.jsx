import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const Filemenu = ({ anchorEl, onClose }) => {
  const [open, setOpen] = useState(false);

  // Open the menu when anchorEl is provided
  React.useEffect(() => {
    if (anchorEl) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [anchorEl]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      // Optional: onClick to close the menu
    >
      <MenuItem onClick={onClose}>Option 1</MenuItem>
      <MenuItem onClick={onClose}>Option 2</MenuItem>
      <MenuItem onClick={onClose}>Option 3</MenuItem>
    </Menu>
  );
}

export default Filemenu;

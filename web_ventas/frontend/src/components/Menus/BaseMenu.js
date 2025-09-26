import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

export function BaseMenu({ icon, items = [], buttonProps = {} }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const withClose = (fn) => () => {
    if (fn) fn();
    handleClose();
  };

  return (
    <div>
      <IconButton
        color="primary"
        onClick={handleClick}
        {...buttonProps}
      >
        {icon || <ArrowDropDownCircleIcon />}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={withClose(item.onClick)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
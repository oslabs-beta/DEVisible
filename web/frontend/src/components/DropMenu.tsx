import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface DropMenuProps {
  handleLogout: () => Promise<void>;
}

export default function DropMenu({ handleLogout }: DropMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //  initialize variable to a boolean of the state of anchorEl, for semantic readability where referenced below
  const open = Boolean(anchorEl);
  //  initialize variable that will invoke the useNavigate hook when called
  const navigate = useNavigate();

  //  function that changes the anchor element when the menu icon is clicked
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //  function that resets anchorEl to null when menu is closed
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: -3 }}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        color="primary.main"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            navigate('/account');
            handleClose();
          }}
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/home');
            handleClose();
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/deps');
            handleClose();
          }}
        >
          Dependencies List
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
}

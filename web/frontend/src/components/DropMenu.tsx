import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * @typeParam handleLogout - method to allow user to log out
 */
interface DropMenuProps {
  handleLogout: () => Promise<void>;
}

/**
 * function to render dropdown menu
 * @param props - takes in {@link DropMenuProps}
 * @returns JSX.Element
 */
export default function DropMenu({ handleLogout }: DropMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //  initialize variable to a boolean of the state of anchorEl, for semantic readability where referenced below
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  /**
   * function that changes the anchor element when the menu icon is clicked
   * @param event - {@link https://developer.mozilla.org/en-US/docs/Web/Events | event type}
   * @returns void
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * function that resets anchorEl to null when menu is closed
   * @returns void
   */
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
        <MenuItem
          onClick={() => {
            navigate('/about');
            handleClose();
          }}
        >
          About Us
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
}

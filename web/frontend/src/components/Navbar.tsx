import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import TransparentOrange from '../assets/Transparent_Orange.svg'

export default function Navbar() {
  return (
    <Box >
      <AppBar  position="static">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
            <Box sx={{display: 'flex', marginBottom: '10px'}}>
          <img className="navbar-icon" src={TransparentOrange} alt="DEVisible"/>

          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

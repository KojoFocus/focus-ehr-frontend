import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import logo from '../assets/logo.png'; // Import the logo

export default function StickyAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position='sticky'>
      <Toolbar style={{ padding: '5px' }}> {/* Reduce padding here */}
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='logo'
          style={{ padding: '5px' }} // Reduce padding here
        >
          <img src={logo} alt='Logo' style={{ height: '30px' }} /> {/* Reduce logo height */}
        </IconButton>
        <div style={{ flexGrow: 1 }} /> {/* This pushes the icons to the right */}
        {isMobile ? (
          <IconButton
            size='large'
            edge='end'
            color='inherit'
            aria-label='menu'
            style={{ padding: '5px' }} // Reduce padding here
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='search'
              style={{ padding: '5px' }} // Reduce padding here
            >
              <SearchIcon />
              <Typography variant='body1' style={{ padding: '5px' }}> {/* Reduce padding here */}
                Search
              </Typography>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='add patient'
              style={{ padding: '5px' }} // Reduce padding here
            >
              <PersonAddIcon />
              <Typography variant='body1' style={{ padding: '5px' }}> {/* Reduce padding here */}
                Add
              </Typography>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='logout'
              style={{ padding: '5px' }} // Reduce padding here
            >
              <ExitToAppIcon />
              <Typography variant='body1' style={{ padding: '5px' }}> {/* Reduce padding here */}
                Logout
              </Typography>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

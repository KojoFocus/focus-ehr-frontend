import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Paper, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../assets/logo.png'; // Import the logo
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080', // Purple color from the logo
    },
    secondary: {
      main: '#008080', // Teal color from the logo
    },
    background: {
      default: '#800080', // Purple color from the logo
    },
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    duration: {
      enteringScreen: 1000,
      leavingScreen: 1000,
    },
  },
});

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userLogin = {
      email:email,
      password:password
    }
    try {
      const response = await fetch(
        `http://localhost:5959/api/users/login`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify(userLogin),
        })
      const data = await response.json()
      console.log(data)
      localStorage.setItem("token", data.token)
      setOpen(true);
    } catch (error) {
      
    }
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh" 
        padding="2rem"
        bgcolor={theme.palette.background.default}
        sx={{
          transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeInOut,
          }),
        }}
      >
        <Container sx={{ padding: 3 }} maxWidth="xs">
          <Paper elevation={isMobile ? 0 : 3} sx={{ padding: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant={isMobile ? "h6" : "h4"} color="textPrimary">Log In</Typography>
              <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Add the logo */}
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box display="flex" justifyContent="center" alignItems="center" width="100%"> {/* Add this Box */}
                <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained' 
                    fullWidth
                    style={{ margin: '10px', fontSize: isMobile ? '0.75rem' : '1rem' }}
                >
                    Log In
                </Button>
              </Box> {/* End of Box */}
            </form>
          </Paper>
        </Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Login Successful!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

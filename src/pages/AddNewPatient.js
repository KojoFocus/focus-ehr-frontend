import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../assets/logo.png'; // Import the logo
import { Alert, Collapse, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Dashboard from './Dashboard.js';

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

function LoadingButton({ loading, ...props }) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : props.children}
    </Button>
  );
}

export default function AddPatient() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('New Patient Added Successfully!');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Add your fetch or axios HTTP request here
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Age: ${age}`);
    console.log(`Gender: ${gender}`);

    // Update message based on response status
    // Open collapsible Alert
    setLoading(false);
  };

  return (
    <>
      <Dashboard />
      <ThemeProvider theme={theme}>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh" // Adjust this value to move the form up
          padding="2rem"
          marginTop="-110px"
          bgcolor={theme.palette.background.default}
          sx={{
            transition: theme.transitions.create('background-color', {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.easeInOut,
            }), 
            // marginTop: '-20vh', // Add this line to move the form up
          }}
        >
          <Container sx={{ padding: 3 }} maxWidth="xs">
            <Paper elevation={isMobile ? 0 : 3} sx={{ padding: 3, borderRadius: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant={isMobile ? "h6" : "h4"} color="textPrimary">Add Patient</Typography>
                <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Add the logo */}
              </Box>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  color="secondary" // Use the teal color from the logo for the text fields
                  sx={{ borderColor: '#20ebf3' }} // Set border color to #20ebf3
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  color="secondary" // Use the teal color from the logo for the text fields
                  sx={{ borderColor: '#20ebf3' }} // Set border color to #20ebf3
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Age"
                  variant="outlined"
                  color="secondary" // Use the teal color from the logo for the text fields
                  sx={{ borderColor: '#20ebf3' }} // Set border color to #20ebf3
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Gender"
                  variant="outlined"
                  color="secondary" // Use the teal color from the logo for the text fields
                  sx={{ borderColor: '#20ebf3' }} // Set border color to #20ebf3
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Box textAlign="center">
                  <Collapse in={open}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <Close fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >{message}</Alert>
                  </Collapse>
                  <LoadingButton
                    sx={{ width: '50%' }}
                    loading={loading}
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    Add Patient
                  </LoadingButton>
                </Box>
              </form>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

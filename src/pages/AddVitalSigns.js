import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../assets/logo.png'; // Import the logo
import Dashboard from './Dashboard';

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

export default function AddVitals({ onAdd }) { // Destructure onAdd from props
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Create a state for each input field
  const [patientId, setPatientId] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new vitals object
    const newVitals = {
      patientId,
      bodyTemperature,
      bloodPressure,
      weight,
      height,
      gender,
    };

    // Call the onAdd prop with the new vitals object
    onAdd(newVitals);
  };

  return (
    <>
    <Dashboard/>
    <ThemeProvider theme={theme}>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh" 
        padding="2rem"
        marginTop="-120px"
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
              <Typography variant={isMobile ? "h6" : "h4"} color="textPrimary">Vital Signs</Typography>
              <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Add the logo */}
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Patient ID"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Body Temperature"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={bodyTemperature}
                onChange={(e) => setBodyTemperature(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Blood Pressure"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Weight"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Height"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Gender"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <Box display="flex" justifyContent="center" alignItems="center" width="100%"> {/* Add this Box */}
                <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained' 
                    fullWidth
                    style={{ margin: '10px', fontSize: isMobile ? '0.75rem' : '1rem' }}
                >
                    Submit
                </Button>
              </Box> {/* End of Box */}
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
    </>
  );
}

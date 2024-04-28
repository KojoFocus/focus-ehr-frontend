import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Paper, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../assets/logo.png'; // Import the logo
import { useNavigate } from 'react-router-dom';
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

export default function AddVitals() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Create a state for each input field
  const [patientId, setPatientId] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pressure, setPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10)); // Add this line

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new vitals object
    const newVitals = {
      patientId:patientId,
      temperature:temperature,
      pressure:pressure,
      weight:weight,
      height:height,
      gender:gender,
      date:date // Add this line
    };

    // Make the API call directly here
    try {
      const response = await fetch(`http://localhost:5959/api/vital-signs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVitals),
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      // Navigate to the All Patients page after successfully adding vitals
      navigate(`/allpatients`);

    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
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
              <Typography variant={isMobile ? "h6" : "h4"} color="textPrimary">Vital Signs</Typography>
              <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Add the logo */}
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Date"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
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
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Blood Pressure"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
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
  );
};

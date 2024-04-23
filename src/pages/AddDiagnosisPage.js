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

export default function AddDiagnosis() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [patientId, setPatientId] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your fetch or axios HTTP request here
    console.log(`Patient ID: ${patientId}`);
    console.log(`Diagnosis Summary: ${summary}`);
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
        marginTop="-240px"
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
              <Typography variant={isMobile ? "h6" : "h4"} color="textPrimary">Add Diagnosis</Typography>
              <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Add the logo */}
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Patient ID"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                sx={{ borderColor: '#20ebf3' }} // Set border color to #20ebf3
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Diagnosis"
                variant="outlined"
                color="secondary" // Use the teal color from the logo for the text fields
                sx={{ borderColor: '#20ebf3' }} // Set border color to #20ebf3
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
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

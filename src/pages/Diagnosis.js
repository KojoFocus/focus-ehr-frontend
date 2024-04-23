import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../assets/logo.png'; // Import the logo

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

export default function Diagnosis() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [diagnoses, setDiagnoses] = useState([]); // State to hold the diagnoses data

  // Fetch the diagnoses data when the component mounts
  useEffect(() => {
    fetch('/api/diagnosis')
      .then(response => response.json())
      .then(data => setDiagnoses(data));
  }, []);

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
        <Container sx={{ padding: 3 }} maxWidth="md">
          <Paper elevation={isMobile ? 0 : 3} sx={{ padding: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant={isMobile ? "h6" : "h4"} color="textPrimary">Diagnoses</Typography>
              <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Add the logo */}
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Patient ID</TableCell>
                    <TableCell align="right">Diagnosis Summary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {diagnoses.map((row) => (
                    <TableRow key={row.patientId}>
                      <TableCell component="th" scope="row">
                        {row.patientId}
                      </TableCell>
                      <TableCell align="right">{row.summary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

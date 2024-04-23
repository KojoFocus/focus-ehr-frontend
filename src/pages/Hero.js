import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import hero from '../assets/hero.png'; // Import the logo
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

export default function Hero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Add this line

  return (
    <ThemeProvider theme={theme}>
      <Box 
        display="flex" 
        flexDirection={isMobile || isTablet ? "column" : "row"} // Adjust for tablet
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
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={isMobile || isTablet ? "0" : "0 2rem"}> {/* Adjust for tablet */}
          <Typography variant={isMobile || isTablet ? "h4" : "h2"} color="textPrimary" align="center"> {/* Adjust for tablet */}
           Focus EHR,
          </Typography>
          <br></br>
          <Typography variant={isMobile || isTablet ? "h6" : "h4"} color="textSecondary" align="center"> {/* Adjust for tablet */}
            A place to manage records efficiently.
          </Typography>


          <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              className='slide auth-slide'
              p={2}
              
            >
              <br></br>
              <br></br>
          <Typography
                variant={isMobile ? 'subtitle2' : 'h5'}
                color='textSecondary'
              >
                Login or Signup to Continue
              </Typography>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                style={{
                  margin: '10px',
                  fontSize: isMobile ? '0.75rem' : '1rem',
                }}
              >
                 <Link to='/Login'>Login</Link> 
              </Button>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                style={{
                  margin: '10px',
                  fontSize: isMobile ? '0.75rem' : '1rem',
                }}
              >
                <Link to='/SignUp'> Signup</Link> 
              </Button>
              </Box>
        </Box>

       
             
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <img src={hero} alt="Logo" style={{ height: isMobile || isTablet ? '200px' : '600px', 
        marginTop: isMobile ||  isTablet ? '-150px' : "-200px",
        }} /> {/* Adjust for tablet */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

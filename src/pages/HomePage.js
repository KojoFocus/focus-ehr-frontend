import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Typography, Button, Box, styled, keyframes } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import hero from '../assets/hero.png';
import { Link } from 'react-router-dom';


import Hero from './Hero';

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
});

// Define keyframes for the fade-in animation
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Create a styled Box component with the animation
const AnimatedBox = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 1s ${theme.transitions.easing.easeInOut}`,
}));

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      
      <ThemeProvider theme={theme}>
      <Box
  display='flex'
  justifyContent='center'
  alignItems='flex-start' // Change this from 'center' to 'flex-start'
  minHeight='100vh'
  padding='2rem'
  bgcolor={theme.palette.background.default}
>

  
  {/* <Carousel
    autoPlay
    interval={2000}
    showThumbs={false}
    showStatus={false}
    dynamicHeight={isMobile}
    infiniteLoop={false}
    showArrows={false}
  > */}
    <Box
      display="flex" 
      flexDirection={isMobile ? 'column-reverse' : 'row'} 
      justifyContent="space-between"
      alignItems="center"
      className="slide welcome-slide"
      p={2}
      sx={{ transform: 'translateY(-50px)' }} // Add this line
    >
      <Hero/>
      
    </Box>
           
          {/* </Carousel> */}
        </Box>
      </ThemeProvider>
    </>
  );
}

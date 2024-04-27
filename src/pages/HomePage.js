import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import { TextField, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from 'react-router-dom';

import logo from "../assets/logo.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#800080",
    },
    secondary: {
      main: "#008080",
    },
    background: {
      default: "#800080",
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

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeStep, setActiveStep] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  };

  // Add this useEffect hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, 1000); // Change slide after 1 second
    return () => clearTimeout(timer);
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
          transition: theme.transitions.create("background-color", {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeInOut,
          }),
        }}
      >
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
        >
          <div>
            {activeStep === 0 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: "block",
                  maxWidth: 400,
                  overflow: "hidden",
                  width: "100%",
                }}
                src={logo}
                alt="Logo"
              />
            ) : null}
          </div>
          <div>
            {activeStep === 1 ? (
              <Container sx={{ padding: 3 }} maxWidth="xs">
                <Paper
                  elevation={isMobile ? 0 : 3}
                  sx={{ padding: 3, borderRadius: 2 }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant={isMobile ? "h6" : "h4"}
                      color="textPrimary"
                    >
                      Log In
                    </Typography>
                    <img src={logo} alt="Logo" style={{ height: "40px" }} />
                  </Box>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      color="secondary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      color="secondary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      <Link
                        to="/home"
                        style={{
                          color: "white",
                          textDecoration: "none",
                        }}
                      >
                        <Button 
                          type='submit' 
                          color='primary' 
                          variant='contained' 
                          fullWidth
                          style={{ margin: '10px', fontSize: isMobile ? '0.75rem' : '1rem' }}
                        >
                          Log In
                        </Button>
                      </Link>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Typography variant="h6" color="textSecondary">
                        New here?
                        <Link to="/signup" style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
                          Sign up
                        </Link>
                      </Typography>
                    </Box>
                  </form>
                </Paper>
              </Container>
            ) : null}
          </div>
        </SwipeableViews>
      </Box>
    </ThemeProvider>
  );
};

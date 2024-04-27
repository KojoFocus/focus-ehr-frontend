import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Paper, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/system";
import logo from '../assets/logo.png'; // Import the logo

export default function Logout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    // Perform your logout operation here.
    // This could be clearing the user data, invalidating the session, etc.

    // After logout, redirect the user to the login page.
    navigate("/login");
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
          transition: theme.transitions.create("background-color", {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeInOut,
          }),
        }}
      >
        <Container sx={{ padding: 3 }} maxWidth="xs">
          <Paper
            elevation={isMobile ? 0 : 3}
            sx={{ padding: 3, borderRadius: 2 }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img src={logo} alt='Logo' style={{ height: '40px' }} />{' '}
              {/* Add the logo */}
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant={isMobile ? "h6" : "h4"} color="textPrimary">
                You're logged out
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              Thank you for using our application. We hope to see you again soon.
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              marginTop="10px"
            >
              <Button
                onClick={handleLogout}
                color="primary"
                variant="contained"
                fullWidth
                style={{
                  margin: "10px",
                  fontSize: isMobile ? "0.75rem" : "1rem",
                }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

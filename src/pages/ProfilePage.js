import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../assets/logo.png"; // Import the logo

import Dashboard from "./Dashboard.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#800080", // Purple color from the logo
    },
    secondary: {
      main: "#008080", // Teal color from the logo
    },
    background: {
      default: "#800080", // Purple color from the logo
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

export default function UserProfile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from server
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:5959/api/users/register`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Dashboard />
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start" // Align items to the top
          minHeight="60vh"
          padding="2rem"
          bgcolor={theme.palette.background.default}
          sx={{
            transition: theme.transitions.create("background-color", {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.easeInOut,
            }),
            marginTop: "-110px", // Adjust this value to move the table up
          }}
        >
          <Container
            sx={{
              padding: 3,
              width: isMobile ? "110%" : "80%",
              marginLeft: "5%",
              marginRight: "auto",
            }}
            maxWidth="false"
          >
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
                  User Profile
                </Typography>
                <img src={logo} alt="Logo" style={{ height: "40px" }} />{" "}
                {/* Add the logo */}
              </Box>
              {user && (
                <Box>
                  <Typography variant="h6">Username: {user.username}</Typography>
                  <Typography variant="h6">Email: {user.email}</Typography>
                  <Typography variant="h6">Address: {user.address}</Typography>
                  {/* Add more user details as needed */}
                </Box>
              )}
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

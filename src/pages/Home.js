import React from "react";
import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import hero from "../assets/hero.png"; // Import the logo

import Dashboard from "./Dashboard.js"; // Import the Dashboard

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

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dashboard />

      <ThemeProvider theme={theme}>
        {/* Add the Dashboard */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          padding={isMobile ? "1rem" : "2rem"} // Reduced padding for mobile
          bgcolor={theme.palette.background.default}
          sx={{
            transition: theme.transitions.create("background-color", {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.easeInOut,
            }),
            marginTop: isMobile ? "-150px" : "0", // Negative margin-top for mobile
            paddingLeft: isMobile ? "60px" : "0"
          }}
        >
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding={isMobile ? "0" : "0 2rem"}
          >
            <Typography
              variant={isMobile ? "h4" : "h2"}
              color="textPrimary"
              align="center"
            >
              Welcome!
            </Typography>
            <br></br>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              color="textSecondary"
              align="center"
            >
              Manage patient's data efficiently... 
            </Typography>
          </Box>

          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={hero}
              alt="Logo"
              style={{ height: isMobile ? "250px" : "750px",
              marginTop: isMobile ? "-300px" : "0", // Negative margin-top for mobile
            }}
            />{" "}
            {/* Add the logo */}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

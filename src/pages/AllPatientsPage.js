import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../assets/logo.png"; // Import the logo

import Dashboard from "./Dashboard.js";
import LongMenu from "../components/LongMenu.js";

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

const drawerWidth = 30; // Replace 240 with the actual width of your drawer

export default function AllPatients() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Use useState to store the patients
  const [patients, setPatients] = useState([]);

  // Use useEffect to fetch the data from your backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`http://localhost:5959/api/patients`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []); // The empty array means this useEffect will run once when the component is mounted

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
                  All Patients
                </Typography>
                <img src={logo} alt="Logo" style={{ height: "40px" }} />{" "}
                {/* Add the logo */}
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Sex</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
  {patients.sort((a, b) => b.id - a.id).map((patient, index) => {
    const id = String(index + 1).padStart(3, '0'); // Generate serial ID starting from 001
    return (
      <TableRow key={patient.id}>
        <TableCell>{id}</TableCell>
        <TableCell>{patient.firstName} {patient.lastName}</TableCell>
        <TableCell>{patient.age}</TableCell>
        <TableCell>{patient.gender}</TableCell>
        <LongMenu patientId={patient.id} />
      </TableRow>
    );
  })}
</TableBody>

                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

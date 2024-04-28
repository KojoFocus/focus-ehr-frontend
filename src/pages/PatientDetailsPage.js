import React from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  Divider,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ReferenceLine,
} from "recharts";
import { Cell, PieChart, Pie } from "recharts";
import Dashboard from "./Dashboard";



  const theme = createTheme({
    palette: {
      primary: {
        main: "#673AB7", // Deep Purple
      },
      secondary: {
        main: "#80CBC4", // Light Teal
      },
      background: {
        default: "#f5f5f5",
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
    marginTop: "64px", // Add this line
  },
});

export default function PatientDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const patientDetails = {
    id: "001",
    name: "Ernest Obimpeh",
    age: "20",
    sex: "Male",
    vitals: {
      temperature: ((98.6 - 32) * 5) / 9,
      bp: 120,
      weight: 15 * 0.453592,
      height: 1.75, // Height in meters
    },
    diagnosis: "Healthy",
    nextVisit: "01/01/2025",
  };

  // Calculate BMI
  const bmi = patientDetails.vitals.weight / patientDetails.vitals.height ** 2;

  const data = [
    {
      name: "Jan",
      temperature: ((98.6 - 32) * 5) / 9,
      bp: 120,
      weight: 150 * 0.453592,
      height: 1.75, // Height in meters
      bmi: 25,
    }, // Converted to Celsius and kilograms
    {
      name: "Feb",
      temperature: ((98.7 - 32) * 5) / 9,
      bp: 115,
      weight: 152 * 0.453592,
      height: 1.75, // Height in meters
      bmi: 25.5,
    }, // Converted to Celsius and kilograms
    // ...more data...
  ];

  // Define the data for the gauge
  const gaugeData = [
    { name: "Underweight", value: bmi < 18.5 ? bmi : 18.5, fill: "#00ff00" },
    {
      name: "Normal",
      value: bmi >= 18.5 && bmi < 25 ? bmi - 18.5 : 24.9 - 18.5,
      fill: "#00ff00",
    },
    {
      name: "Overweight",
      value: bmi >= 25 && bmi < 30 ? bmi - 25 : 29.9 - 25,
      fill: "#ffbf00",
    },
    { name: "Obese", value: bmi >= 30 ? bmi - 30 : 34.9 - 30, fill: "#ff4000" },
  ];

  // Define the BMI Gauge component
  function BMIGauge() {
    // Determine the BMI category
    let bmiCategory = "";
    if (bmi < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmi < 25) {
      bmiCategory = "Normal";
    } else if (bmi < 30) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }

    return (
      <>
      <Dashboard/>
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        
      >
        <PieChart width={400} height={200}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={gaugeData}
            cx={200}
            cy={150} // Adjusted the y-coordinate of the center
            outerRadius={100} // Adjust the gauge size
            innerRadius={80} // Adjust the gauge size
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill}>
                <Label position="center" content={entry.name} />
              </Cell>
            ))}
          </Pie>
          <text x={200} y={200} dy={-35} textAnchor="middle" fill="#000">
            {`BMI: ${bmi.toFixed(2)}`}
          </text>
          <text x={200} y={200} dy={-10} textAnchor="middle" fill="#000">
            {`Category: ${bmiCategory}`}
          </text>
        </PieChart>
      </Box>
      </>
    );
  }

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
          marginTop: "64px", // Add this line
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              marginBottom: 2,
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            }}
          >
            <CardContent>
              <Typography variant="h5">{patientDetails.name}</Typography>
              <Typography variant="body1">Age: {patientDetails.age}</Typography>
              <Typography variant="body1">Sex: {patientDetails.sex}</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              marginBottom: 2,
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
            }}
          >
            <CardContent>
              <Typography variant="h6">Vitals:</Typography>
              <Typography variant="body1">
                Temperature: {patientDetails.vitals.temperature.toFixed(2)}° C
              </Typography>{" "}
              {/* Added degree symbol */}
              <Typography variant="body1">
                Blood Pressure: {patientDetails.vitals.bp} mmHg
              </Typography>
              <Typography variant="body1">
                Weight: {patientDetails.vitals.weight.toFixed(2)} kg
              </Typography>
              <Typography variant="body1">
                BMI: {patientDetails.vitals.bmi}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">Diagnosis:</Typography>
              <Typography variant="body1">
                {patientDetails.diagnosis}
              </Typography>
            </CardContent>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Temperature Trend</Typography>
                  <LineChart width={400} height={200} data={data}>
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#FF0000"
                    />{" "}
                    {/* Changed line color to red */}
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Blood Pressure Trend</Typography>
                  <LineChart width={400} height={200} data={data}>
                    <Line type="monotone" dataKey="bp" stroke="#0000FF" />{" "}
                    {/* Changed line color to blue */}
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">BMI Gauge</Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    marginLeft= "-140px"
                  >
                    <BMIGauge />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

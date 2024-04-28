import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import Signup from "./pages/signup.js";
import Login from "./pages/login.js";
import Dashboard from "./pages/Dashboard.js";
import AllPatients from "./pages/AllPatientsPage.js";
import AddPatient from "./pages/AddNewPatient.js";
import Home from "./pages/Home.js";
import PatientDetails from "./pages/PatientDetailsPage.js";
import AddVitals from "./pages/AddVitalSigns.js";
import AddDiagnosis from "./pages/AddDiagnosisPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Logout from "./pages/Logout.js";

import { useState } from 'react';


export default function App() {

  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allpatients" element={<AllPatients />} />
        <Route path="/addnewpatient" element={<AddPatient />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patientdetails" element={<PatientDetails />} />
        <Route path="/addvitalsigns" element={<AddVitals />} />
        <Route path="/adddiagnosis" element={<AddDiagnosis />} />
      </Routes>
    </BrowserRouter>
  );
}

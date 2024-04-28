import React, { useState } from 'react';
import AddPatient from './AddPatient';
import AllPatients from './AllPatients';

function Main() {
  const [patients, setPatients] = useState([]);

  const addPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  return (
    <div className="Main">
      <AddPatient onAdd={addPatient} />
      <AllPatients patients={patients} />
    </div>
  );
}

export default Main;

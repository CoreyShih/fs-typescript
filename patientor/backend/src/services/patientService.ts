import patientData from "../../data/patients.ts";
import type { Patient, NonSensitivePatient, NewPatient } from "../types.ts";

const patients = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: crypto.randomUUID(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };

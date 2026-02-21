import { Patient } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
let patients: Patient[] = [
  {
    id: 'patient-1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-8888',
    cpf: '123.456.789-00',
    birthDate: '1985-05-15',
    gender: 'male',
    address: {
      street: 'Rua das Flores',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: 'patient-2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '(11) 97777-6666',
    cpf: '987.654.321-00',
    birthDate: '1990-11-22',
    gender: 'female',
    address: {
      street: 'Av. Paulista',
      number: '1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    createdAt: '2023-02-20T14:20:00Z',
    updatedAt: '2023-02-20T14:20:00Z'
  },
  {
    id: 'patient-3',
    name: 'Pedro Santos',
    email: 'pedro.santos@email.com',
    phone: '(11) 95555-4444',
    cpf: '456.789.123-00',
    birthDate: '1978-03-10',
    gender: 'male',
    address: {
      street: 'Rua Oscar Freire',
      number: '500',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-000'
    },
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-03-10T09:15:00Z'
  }
];

export const mockGetPatients = async (page: number = 1, limit: number = 10): Promise<{ data: Patient[]; total: number; page: number; limit: number }> => {
  await delay(500); // Simulate network delay
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = patients.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: patients.length,
    page,
    limit
  };
};

export const mockGetPatientById = async (id: string): Promise<Patient> => {
  await delay(400); // Simulate network delay
  
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  
  return patient;
};

export const mockCreatePatient = async (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> => {
  await delay(600); // Simulate network delay
  
  const newPatient: Patient = {
    ...patientData,
    id: `patient-${patients.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  patients.push(newPatient);
  
  return newPatient;
};

export const mockUpdatePatient = async (id: string, patientData: Partial<Omit<Patient, 'id' | 'createdAt'>>): Promise<Patient> => {
  await delay(600); // Simulate network delay
  
  const patientIndex = patients.findIndex(p => p.id === id);
  if (patientIndex === -1) {
    throw new Error(`Patient with id ${id} not found`);
  }
  
  patients[patientIndex] = {
    ...patients[patientIndex],
    ...patientData,
    updatedAt: new Date().toISOString()
  };
  
  return patients[patientIndex];
};

export const mockDeletePatient = async (id: string): Promise<void> => {
  await delay(500); // Simulate network delay
  
  patients = patients.filter(p => p.id !== id);
};
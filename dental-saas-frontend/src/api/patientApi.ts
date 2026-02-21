import apiClient from './apiClient';
import { Patient } from '../types';
import { 
  mockGetPatients, 
  mockGetPatientById, 
  mockCreatePatient, 
  mockUpdatePatient, 
  mockDeletePatient 
} from '../mocks/patientMocks';

// Define se estamos usando mocks ou API real
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || true; // Por padrão, usar mocks

export const patientApi = {
  getPatients: async (page: number = 1, limit: number = 10) => {
    if (USE_MOCKS) {
      return mockGetPatients(page, limit);
    } else {
      const response = await apiClient.get(`/patients?page=${page}&limit=${limit}`);
      return response.data;
    }
  },

  getPatientById: async (id: string): Promise<Patient> => {
    if (USE_MOCKS) {
      return mockGetPatientById(id);
    } else {
      const response = await apiClient.get(`/patients/${id}`);
      return response.data;
    }
  },

  createPatient: async (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> => {
    if (USE_MOCKS) {
      return mockCreatePatient(patientData);
    } else {
      const response = await apiClient.post('/patients', patientData);
      return response.data;
    }
  },

  updatePatient: async (id: string, patientData: Partial<Omit<Patient, 'id' | 'createdAt'>>): Promise<Patient> => {
    if (USE_MOCKS) {
      return mockUpdatePatient(id, patientData);
    } else {
      const response = await apiClient.put(`/patients/${id}`, patientData);
      return response.data;
    }
  },

  deletePatient: async (id: string): Promise<void> => {
    if (USE_MOCKS) {
      return mockDeletePatient(id);
    } else {
      await apiClient.delete(`/patients/${id}`);
    }
  }
};
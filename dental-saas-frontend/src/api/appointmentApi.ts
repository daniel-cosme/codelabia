import apiClient from './apiClient';
import { Appointment } from '../types';
import { 
  mockGetAppointments, 
  mockGetAppointmentById, 
  mockCreateAppointment, 
  mockUpdateAppointment, 
  mockDeleteAppointment 
} from '../mocks/appointmentMocks';

// Define se estamos usando mocks ou API real
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || true; // Por padrão, usar mocks

export const appointmentApi = {
  getAppointments: async (date: string, professionalId?: string) => {
    if (USE_MOCKS) {
      return mockGetAppointments(date, professionalId);
    } else {
      const params = new URLSearchParams();
      params.append('date', date);
      if (professionalId) {
        params.append('professionalId', professionalId);
      }
      const response = await apiClient.get(`/appointments?${params.toString()}`);
      return response.data;
    }
  },

  getAppointmentById: async (id: string): Promise<Appointment> => {
    if (USE_MOCKS) {
      return mockGetAppointmentById(id);
    } else {
      const response = await apiClient.get(`/appointments/${id}`);
      return response.data;
    }
  },

  createAppointment: async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> => {
    if (USE_MOCKS) {
      return mockCreateAppointment(appointmentData);
    } else {
      const response = await apiClient.post('/appointments', appointmentData);
      return response.data;
    }
  },

  updateAppointment: async (id: string, appointmentData: Partial<Omit<Appointment, 'id' | 'createdAt'>>): Promise<Appointment> => {
    if (USE_MOCKS) {
      return mockUpdateAppointment(id, appointmentData);
    } else {
      const response = await apiClient.put(`/appointments/${id}`, appointmentData);
      return response.data;
    }
  },

  deleteAppointment: async (id: string): Promise<void> => {
    if (USE_MOCKS) {
      return mockDeleteAppointment(id);
    } else {
      await apiClient.delete(`/appointments/${id}`);
    }
  }
};
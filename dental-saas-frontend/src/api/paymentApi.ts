import apiClient from './apiClient';
import { Payment } from '../types';
import { 
  mockGetPayments, 
  mockGetPaymentById, 
  mockCreatePayment, 
  mockUpdatePayment, 
  mockDeletePayment,
  mockGetMonthlySummary
} from '../mocks/paymentMocks';

// Define se estamos usando mocks ou API real
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || true; // Por padrão, usar mocks

export const paymentApi = {
  getPayments: async (month?: number, year?: number) => {
    if (USE_MOCKS) {
      return mockGetPayments(month, year);
    } else {
      const params = new URLSearchParams();
      if (month !== undefined) params.append('month', month.toString());
      if (year !== undefined) params.append('year', year.toString());
      const response = await apiClient.get(`/payments?${params.toString()}`);
      return response.data;
    }
  },

  getPaymentById: async (id: string): Promise<Payment> => {
    if (USE_MOCKS) {
      return mockGetPaymentById(id);
    } else {
      const response = await apiClient.get(`/payments/${id}`);
      return response.data;
    }
  },

  createPayment: async (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> => {
    if (USE_MOCKS) {
      return mockCreatePayment(paymentData);
    } else {
      const response = await apiClient.post('/payments', paymentData);
      return response.data;
    }
  },

  updatePayment: async (id: string, paymentData: Partial<Omit<Payment, 'id' | 'createdAt'>>): Promise<Payment> => {
    if (USE_MOCKS) {
      return mockUpdatePayment(id, paymentData);
    } else {
      const response = await apiClient.put(`/payments/${id}`, paymentData);
      return response.data;
    }
  },

  deletePayment: async (id: string): Promise<void> => {
    if (USE_MOCKS) {
      return mockDeletePayment(id);
    } else {
      await apiClient.delete(`/payments/${id}`);
    }
  },

  getMonthlySummary: async (month: number, year: number) => {
    if (USE_MOCKS) {
      return mockGetMonthlySummary(month, year);
    } else {
      const response = await apiClient.get(`/payments/summary?month=${month}&year=${year}`);
      return response.data;
    }
  }
};
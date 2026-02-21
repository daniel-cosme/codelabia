import apiClient from './apiClient';
import { mockLogin, mockLogout } from '../mocks/authMocks';
import { User } from '../types';

// Define se estamos usando mocks ou API real
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || true; // Por padrão, usar mocks

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    if (USE_MOCKS) {
      return mockLogin(credentials.email, credentials.password);
    } else {
      // Em produção, usaria a API real
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    }
  },

  logout: async (): Promise<void> => {
    if (USE_MOCKS) {
      return mockLogout();
    } else {
      // Em produção, faria logout na API real
      try {
        await apiClient.post('/auth/logout');
      } catch (error) {
        // Se falhar, continuar com logout local
        console.warn('Logout failed on server, proceeding with local logout', error);
      }
    }
  }
};
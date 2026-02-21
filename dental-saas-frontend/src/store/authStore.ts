import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  clinicId: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setClinicId: (clinicId: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  clinicId: null,
  isAuthenticated: false,
  
  login: (user, token) => set({ 
    user, 
    token, 
    isAuthenticated: true,
    clinicId: user.clinicId 
  }),
  
  logout: () => set({ 
    user: null, 
    token: null, 
    clinicId: null, 
    isAuthenticated: false 
  }),
  
  setClinicId: (clinicId) => set({ clinicId })
}));
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  clinicId: string;
}

// Patient types
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  professionalId: string;
  professionalName: string;
  date: string; // ISO string
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  service: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Payment types
export interface Payment {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId: string;
  amount: number;
  currency: string;
  method: 'cash' | 'credit-card' | 'debit-card' | 'pix' | 'bank-transfer';
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string; // ISO string
  paidAt?: string; // ISO string
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Clinic types
export interface Clinic {
  id: string;
  name: string;
  cnpj: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
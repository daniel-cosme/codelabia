import { Payment } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
let payments: Payment[] = [
  {
    id: 'payment-1',
    patientId: 'patient-1',
    patientName: 'João Silva',
    appointmentId: 'appointment-1',
    amount: 150.00,
    currency: 'BRL',
    method: 'credit-card',
    status: 'paid',
    dueDate: '2023-06-15',
    paidAt: '2023-06-15',
    description: 'Consulta de rotina',
    createdAt: '2023-06-10T10:30:00Z',
    updatedAt: '2023-06-15T11:00:00Z'
  },
  {
    id: 'payment-2',
    patientId: 'patient-2',
    patientName: 'Maria Oliveira',
    appointmentId: 'appointment-2',
    amount: 200.00,
    currency: 'BRL',
    method: 'cash',
    status: 'pending',
    dueDate: '2023-06-20',
    description: 'Limpeza',
    createdAt: '2023-06-11T14:20:00Z',
    updatedAt: '2023-06-11T14:20:00Z'
  },
  {
    id: 'payment-3',
    patientId: 'patient-3',
    patientName: 'Pedro Santos',
    appointmentId: 'appointment-3',
    amount: 800.00,
    currency: 'BRL',
    method: 'pix',
    status: 'paid',
    dueDate: '2023-06-12',
    paidAt: '2023-06-12',
    description: 'Extração',
    createdAt: '2023-06-12T09:15:00Z',
    updatedAt: '2023-06-12T09:30:00Z'
  },
  {
    id: 'payment-4',
    patientId: 'patient-1',
    patientName: 'João Silva',
    appointmentId: 'appointment-4',
    amount: 300.00,
    currency: 'BRL',
    method: 'debit-card',
    status: 'overdue',
    dueDate: '2023-06-10',
    description: 'Retorno',
    createdAt: '2023-06-13T16:45:00Z',
    updatedAt: '2023-06-15T10:00:00Z'
  }
];

export const mockGetPayments = async (month?: number, year?: number): Promise<Payment[]> => {
  await delay(500); // Simulate network delay
  
  let filteredPayments = [...payments];
  
  if (month !== undefined && year !== undefined) {
    filteredPayments = filteredPayments.filter(payment => {
      const paymentDate = new Date(payment.dueDate);
      return paymentDate.getMonth() === month && paymentDate.getFullYear() === year;
    });
  }
  
  return filteredPayments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const mockGetPaymentById = async (id: string): Promise<Payment> => {
  await delay(400); // Simulate network delay
  
  const payment = payments.find(p => p.id === id);
  if (!payment) {
    throw new Error(`Payment with id ${id} not found`);
  }
  
  return payment;
};

export const mockCreatePayment = async (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> => {
  await delay(600); // Simulate network delay
  
  const newPayment: Payment = {
    ...paymentData,
    id: `payment-${payments.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  payments.push(newPayment);
  
  return newPayment;
};

export const mockUpdatePayment = async (id: string, paymentData: Partial<Omit<Payment, 'id' | 'createdAt'>>): Promise<Payment> => {
  await delay(600); // Simulate network delay
  
  const paymentIndex = payments.findIndex(p => p.id === id);
  if (paymentIndex === -1) {
    throw new Error(`Payment with id ${id} not found`);
  }
  
  payments[paymentIndex] = {
    ...payments[paymentIndex],
    ...paymentData,
    updatedAt: new Date().toISOString()
  };
  
  return payments[paymentIndex];
};

export const mockDeletePayment = async (id: string): Promise<void> => {
  await delay(500); // Simulate network delay
  
  payments = payments.filter(p => p.id !== id);
};

// Get monthly summary
export const mockGetMonthlySummary = async (month: number, year: number): Promise<{
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
}> => {
  await delay(400); // Simulate network delay
  
  const monthlyPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.dueDate);
    return paymentDate.getMonth() === month && paymentDate.getFullYear() === year;
  });
  
  let totalRevenue = 0;
  let pendingAmount = 0;
  let overdueAmount = 0;
  let paidCount = 0;
  let pendingCount = 0;
  let overdueCount = 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  monthlyPayments.forEach(payment => {
    switch (payment.status) {
      case 'paid':
        totalRevenue += payment.amount;
        paidCount++;
        break;
      case 'pending':
        pendingAmount += payment.amount;
        pendingCount++;
        break;
      case 'overdue':
        overdueAmount += payment.amount;
        overdueCount++;
        break;
    }
    
    // Also check if pending payments are actually overdue
    if (payment.status === 'pending') {
      const dueDate = new Date(payment.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        overdueAmount += payment.amount;
        overdueCount++;
        pendingAmount -= payment.amount;
        pendingCount--;
      }
    }
  });
  
  return {
    totalRevenue,
    pendingAmount,
    overdueAmount,
    paidCount,
    pendingCount,
    overdueCount
  };
};
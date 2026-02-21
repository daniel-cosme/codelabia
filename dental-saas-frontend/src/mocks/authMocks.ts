import { User } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  await delay(800); // Simulate network delay
  
  if (email === 'admin@dentalclinic.com' && password === 'password') {
    const user: User = {
      id: 'user-1',
      name: 'Dr. Admin',
      email: 'admin@dentalclinic.com',
      clinicId: 'clinic-1'
    };
    
    return {
      user,
      token: 'mock-jwt-token-for-demo-purposes'
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const mockLogout = async (): Promise<void> => {
  await delay(300);
  // In a real app, we would invalidate the token on the server
  return Promise.resolve();
};
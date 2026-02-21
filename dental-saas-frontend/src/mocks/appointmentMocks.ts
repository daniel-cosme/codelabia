import { Appointment } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
let appointments: Appointment[] = [
  {
    id: 'appointment-1',
    patientId: 'patient-1',
    patientName: 'João Silva',
    professionalId: 'professional-1',
    professionalName: 'Dr. Carlos Souza',
    date: '2023-06-15',
    startTime: '09:00',
    endTime: '10:00',
    status: 'confirmed',
    service: 'Consulta de rotina',
    notes: 'Paciente com histórico de sensibilidade',
    createdAt: '2023-06-10T10:30:00Z',
    updatedAt: '2023-06-10T10:30:00Z'
  },
  {
    id: 'appointment-2',
    patientId: 'patient-2',
    patientName: 'Maria Oliveira',
    professionalId: 'professional-1',
    professionalName: 'Dr. Carlos Souza',
    date: '2023-06-15',
    startTime: '10:30',
    endTime: '11:30',
    status: 'scheduled',
    service: 'Limpeza',
    notes: '',
    createdAt: '2023-06-11T14:20:00Z',
    updatedAt: '2023-06-11T14:20:00Z'
  },
  {
    id: 'appointment-3',
    patientId: 'patient-3',
    patientName: 'Pedro Santos',
    professionalId: 'professional-2',
    professionalName: 'Dra. Ana Costa',
    date: '2023-06-15',
    startTime: '14:00',
    endTime: '15:00',
    status: 'completed',
    service: 'Extração',
    notes: 'Paciente necessita de anestesia local extra',
    createdAt: '2023-06-12T09:15:00Z',
    updatedAt: '2023-06-12T09:15:00Z'
  },
  {
    id: 'appointment-4',
    patientId: 'patient-1',
    patientName: 'João Silva',
    professionalId: 'professional-2',
    professionalName: 'Dra. Ana Costa',
    date: '2023-06-16',
    startTime: '11:00',
    endTime: '12:00',
    status: 'scheduled',
    service: 'Retorno',
    notes: '',
    createdAt: '2023-06-13T16:45:00Z',
    updatedAt: '2023-06-13T16:45:00Z'
  }
];

export const mockGetAppointments = async (date: string, professionalId?: string): Promise<Appointment[]> => {
  await delay(500); // Simulate network delay
  
  let filteredAppointments = [...appointments];
  
  // Filter by date
  filteredAppointments = filteredAppointments.filter(appt => appt.date === date);
  
  // Filter by professional if provided
  if (professionalId) {
    filteredAppointments = filteredAppointments.filter(appt => appt.professionalId === professionalId);
  }
  
  return filteredAppointments.sort((a, b) => {
    // Sort by date and then by start time
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });
};

export const mockGetAppointmentById = async (id: string): Promise<Appointment> => {
  await delay(400); // Simulate network delay
  
  const appointment = appointments.find(a => a.id === id);
  if (!appointment) {
    throw new Error(`Appointment with id ${id} not found`);
  }
  
  return appointment;
};

export const mockCreateAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> => {
  await delay(600); // Simulate network delay
  
  const newAppointment: Appointment = {
    ...appointmentData,
    id: `appointment-${appointments.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  appointments.push(newAppointment);
  
  return newAppointment;
};

export const mockUpdateAppointment = async (id: string, appointmentData: Partial<Omit<Appointment, 'id' | 'createdAt'>>): Promise<Appointment> => {
  await delay(600); // Simulate network delay
  
  const appointmentIndex = appointments.findIndex(a => a.id === id);
  if (appointmentIndex === -1) {
    throw new Error(`Appointment with id ${id} not found`);
  }
  
  appointments[appointmentIndex] = {
    ...appointments[appointmentIndex],
    ...appointmentData,
    updatedAt: new Date().toISOString()
  };
  
  return appointments[appointmentIndex];
};

export const mockDeleteAppointment = async (id: string): Promise<void> => {
  await delay(500); // Simulate network delay
  
  appointments = appointments.filter(a => a.id !== id);
};
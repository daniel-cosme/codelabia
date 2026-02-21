import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { appointmentApi } from '../api/appointmentApi';
import { patientApi } from '../api/patientApi';
import { paymentApi } from '../api/paymentApi';
import { Appointment, Patient, Payment } from '../types';

const DashboardPage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Fetch appointments for today
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery<Appointment[], Error>({
    queryKey: ['appointments', today],
    queryFn: () => appointmentApi.getAppointments(today),
  });

  // Fetch recent patients
  const { data: patients = [], isLoading: patientsLoading } = useQuery<Patient[], Error>({
    queryKey: ['patients', 1, 5], // First page, 5 items
    queryFn: () => patientApi.getPatients(1, 5),
  });

  // Fetch recent payments
  const { data: payments = [], isLoading: paymentsLoading } = useQuery<Payment[], Error>({
    queryKey: ['payments'],
    queryFn: () => paymentApi.getPayments(),
  });

  // Calculate stats
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Consultas Hoje</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{appointments.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Confirmadas</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{confirmedAppointments}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Receita</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">R$ {totalRevenue.toFixed(2)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pendentes</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{pendingPayments}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Consultas de Hoje</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {appointmentsLoading ? (
              <li className="px-4 py-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </li>
            ) : appointments.length === 0 ? (
              <li className="px-4 py-4 text-center text-gray-500">Nenhuma consulta agendada para hoje</li>
            ) : (
              appointments.map((appointment) => (
                <li key={appointment.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmado' :
                       appointment.status === 'completed' ? 'Concluído' :
                       appointment.status === 'scheduled' ? 'Agendado' : 'Cancelado'}
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {appointment.startTime} - {appointment.endTime} • {appointment.service}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Profissional: {appointment.professionalName}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Patients */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pacientes Recentes</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {patientsLoading ? (
              <li className="px-4 py-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </li>
            ) : patients.length === 0 ? (
              <li className="px-4 py-4 text-center text-gray-500">Nenhum paciente cadastrado</li>
            ) : (
              patients.map((patient) => (
                <li key={patient.id} className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{patient.phone} • {patient.email}</div>
                  <div className="mt-1 text-sm text-gray-500">Cadastrado em: {new Date(patient.createdAt).toLocaleDateString()}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
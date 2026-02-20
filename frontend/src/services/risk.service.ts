import { api } from './api';
import { Risk } from '../types';

/**
 * Service to handle Risk-related API calls.
 * Linked to Projects via ForeignKey in your PostgreSQL database.
 */

// Fetch all risks (GET /api/risks/)
export const getRisks = async (): Promise<Risk[]> => {
  const response = await api.get<Risk[]>('/risks/');
  return response.data;
};

// Fetch risks specific to a project (GET /api/projects/{id}/risks/)
// Assuming your Django URLs support nested resources or filtering
export const getRisksByProject = async (projectId: number): Promise<Risk[]> => {
  const response = await api.get<Risk[]>(`/risks/?project=${projectId}`);
  return response.data;
};

// Create a new risk (POST /api/risks/)
// Data: title, description, severity, status, project (ID)
export const createRisk = async (riskData: Omit<Risk, 'id' | 'created_at'>): Promise<Risk> => {
  const response = await api.post<Risk>('/risks/', riskData);
  return response.data;
};

// Update an existing risk (PATCH /api/risks/{id}/)
export const updateRisk = async (id: number, riskData: Partial<Risk>): Promise<Risk> => {
  const response = await api.patch<Risk>(`/risks/${id}/`, riskData);
  return response.data;
};

// Delete a risk (DELETE /api/risks/{id}/)
export const deleteRisk = async (id: number): Promise<void> => {
  await api.delete(`/risks/${id}/`);
};
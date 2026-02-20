import { api } from './api';
import { Testcase } from '../types';

/**
 * Service to handle Testcase-related API calls.
 * Testcases are linked to Projects (ForeignKey) in your PostgreSQL database.
 */

// Fetch all testcases (GET /api/testcases/)
export const getTestcases = async (): Promise<Testcase[]> => {
  const response = await api.get<Testcase[]>('/testcases/');
  return response.data;
};

// Fetch testcases for a specific project (GET /api/testcases/?project=id)
export const getTestcasesByProject = async (projectId: number): Promise<Testcase[]> => {
  const response = await api.get<Testcase[]>(`/testcases/?project=${projectId}`);
  return response.data;
};

// Create a new testcase (POST /api/testcases/)
// Fields: title, steps, expected_result, priority, status, project (ID)
export const createTestcase = async (testcaseData: Omit<Testcase, 'id'>): Promise<Testcase> => {
  const response = await api.post<Testcase>('/testcases/', testcaseData);
  return response.data;
};

// Update a testcase status or details (PATCH /api/testcases/{id}/)
export const updateTestcase = async (id: number, data: Partial<Testcase>): Promise<Testcase> => {
  const response = await api.patch<Testcase>(`/testcases/${id}/`, data);
  return response.data;
};

// Delete a testcase (DELETE /api/testcases/{id}/)
export const deleteTestcase = async (id: number): Promise<void> => {
  await api.delete(`/testcases/${id}/`);
};
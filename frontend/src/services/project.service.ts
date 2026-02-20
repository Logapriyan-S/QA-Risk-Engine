import { api } from './api';
import { Project } from '../types';

/**
 * Service to handle Project-related API calls.
 * These methods align with the CRUD operations in your Django REST backend.
 */

// Fetch all projects (GET /api/projects/)
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/projects/');
  return response.data;
};

// Fetch a single project by ID (GET /api/projects/{id}/)
export const getProjectDetail = async (id: number): Promise<Project> => {
  const response = await api.get<Project>(`/projects/${id}/`);
  return response.data;
};

// Create a new project (POST /api/projects/)
export const createProject = async (projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
  const response = await api.post<Project>('/projects/', projectData);
  return response.data;
};

// Delete a project (DELETE /api/projects/{id}/)
export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}/`);
};
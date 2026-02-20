// src/types/index.ts

export type Severity = 'Low' | 'Medium' | 'High';
export type RiskStatus = 'Open' | 'Closed' | 'In Progress';
export type TestStatus = 'Pending' | 'Passed' | 'Failed';
export type TestPriority = 'Low' | 'Medium' | 'High';
export type UserRole = 'Admin' | 'Client';

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  created_at: string;
  avatar?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export interface Risk {
  id: number;
  project: number;
  title: string;
  description: string;
  severity: Severity;
  status: RiskStatus;
  created_at?: string;
}

export interface Testcase {
  id: number;
  project: number;
  title: string;
  steps: string;
  expected_result: string;
  priority: TestPriority;
  status: TestStatus;
  created_at?: string;
}
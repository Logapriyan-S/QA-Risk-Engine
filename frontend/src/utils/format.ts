import { Severity } from '../types';

/**
 * Formats a ISO date string from PostgreSQL into a human-readable format.
 * Example: "2025-11-20T..." -> "Nov 20, 2025"
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Capitalizes the first letter of a status or role.
 * Example: "mitigated" -> "Mitigated"
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Returns a CSS color class based on the Risk Severity level.
 * Useful for dynamic styling in your Badge component.
 */
export const getSeverityColor = (severity: Severity): string => {
  switch (severity) {
    case 'High':
      return 'text-red-500 bg-red-500/10 border-red-500/20';
    case 'Medium':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    case 'Low':
      return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    default:
      return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
  }
};

/**
 * Truncates long descriptions for the Project and Risk tables.
 */
export const truncate = (text: string, length: number = 60): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
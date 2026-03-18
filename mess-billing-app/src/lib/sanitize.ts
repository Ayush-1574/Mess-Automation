// Strips sensitive auth fields from student objects before sending as API response
const SENSITIVE_FIELDS = ['password', 'resetToken', 'resetTokenExp'];

export function sanitizeStudent<T extends Record<string, any>>(student: T): Omit<T, 'password' | 'resetToken' | 'resetTokenExp'> {
  const sanitized = { ...student };
  for (const field of SENSITIVE_FIELDS) {
    delete sanitized[field];
  }
  return sanitized;
}

export function sanitizeStudents<T extends Record<string, any>>(students: T[]): Omit<T, 'password' | 'resetToken' | 'resetTokenExp'>[] {
  return students.map(sanitizeStudent);
}

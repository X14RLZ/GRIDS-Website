
export type UserRole = 'Data Provider' | 'Data Reviewer' | 'Administrator' | 'Guest';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  office: string;
  phone: string;
  birthdate: string;
  landline?: string;
}

export interface Submission {
  id: string;
  formName: string;
  submittedBy: string;
  response: 'Approved' | 'Denied' | 'Pending';
  reviewedBy: string;
  date: string;
  created: string;
  fileSize?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  department: string;
}

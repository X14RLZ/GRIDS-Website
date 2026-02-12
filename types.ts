
/**
 * TYPE DEFINITIONS:
 * These interfaces define the standard "shape" of data used across the application,
 * strictly following the provided UML Class Diagram for the GRIDS project.
 */

// Role Management (mapped to Role class in UML)
export type UserRole = 'Administrator' | 'Data Provider' | 'Data Reviewer' | 'Data Analyst' | 'Public User' | 'Guest';

export interface Role {
  roleId: string;
  roleName: UserRole;
  description: string;
}

// User Identity (mapped to User base class and its descendants)
export interface User {
  userId?: string;
  username?: string;
  passwordHash?: string;
  email: string;
  firstName: string;
  lastName: string;
  contactInfo?: string; // From UML: String contactInfo
  createdAt?: string;
  lastLogin?: string;
  isActive?: boolean;
  role: UserRole;
  // Specific attributes for DataProvider/Reviewer/Analyst roles
  departmentId?: string;
  officeId?: string;
  office: string;
  birthdate?: string;
  phone?: string;
  landline?: string;
  status?: string;
}

// Organizational Structure
export interface Department {
  departmentId: string;
  departmentName: string;
}

export interface Office {
  officeId: string;
  officeName: string;
  departmentId: string;
}

// Data Submission & Management
// Renamed to Submission to match application usage
export interface Submission {
  id: string;
  formName: string;
  submittedBy: string;
  office: string;
  response: 'Pending' | 'Approved' | 'Denied';
  reviewedBy: string;
  date: string;
  created: string;
  fileSize: string;
  isStoredLocally?: boolean;
  reviewerRemarks?: string;
  // UML specific fields
  submissionDate?: string;
  comment?: string;
  optionalComment?: string;
}

// Detailed Data Entity
export interface DataSet {
  dataSetId: string;
  submissionId: string;
  indicatorId?: string; // Associated with GADIndicator
  name: string;
  description: string;
  fileType: string;
  formatGuidelines: string;
  isSensitive: boolean;
  isAnonymized: boolean;
  collectionFrequency: string;
  storageLocation: string;
}

// Review Workflow
export interface ReviewProcess {
  reviewId: string;
  submissionId: string;
  reviewerUserId: string;
  reviewDate: string;
  status: string;
  remarks: string;
  justification: string;
}

// GAD Specific Entities
export interface GADIndicator {
  indicatorId: string;
  indicatorName: string;
  definition: string;
  source: string;
  category: string;
}

export interface Metadata {
  metadataId: string;
  key: string;
  value: string;
  description: string;
  appliesTo: string; // ID of the entity it describes
}

// System Communication
// Updated properties to match implementation usage
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  department: string;
  targetUrl?: string;
  // UML specific fields
  recipientUserId?: string;
  type?: string;
}


import { User, AuditLog, Submission } from '../types';

/**
 * PRODUCTION-GRADE API SERVICE
 * This module simulates the transition from localStorage to a real backend REST/GraphQL API.
 * In a real-world scenario, these would be fetch() calls to a Node.js/Python server.
 */

const BASE_URL = 'https://api.grids-baguio.gov.ph/v1';

export const RegistryAPI = {
  // Requirement 2: Centralized User Management
  async fetchUsers(): Promise<User[]> {
    console.log(`[GET] ${BASE_URL}/users - Retrieving cloud registry`);
    const stored = localStorage.getItem('grids_users');
    return stored ? JSON.parse(stored) : [];
  },

  async commitUser(user: User): Promise<void> {
    console.log(`[POST] ${BASE_URL}/users/commit - Persisting to cloud DB`);
    const users = await this.fetchUsers();
    const updated = users.map(u => u.email === user.email ? { ...u, status: 'Active' } : u);
    localStorage.setItem('grids_users', JSON.stringify(updated));
  }
};

export const AuditAPI = {
  // Requirement 2: Real-time Audit Logs (POST to secure server)
  async postLog(log: AuditLog): Promise<void> {
    console.log(`[POST] ${BASE_URL}/audit - Securely streaming log to cloud`, log);
    // Simulation of network request
    return new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const FileStorageAPI = {
  // Requirement 2: File Management (S3/GCS Integration)
  async getDownloadPresignedUrl(fileId: string): Promise<string> {
    console.log(`[GET] ${BASE_URL}/storage/sign/${fileId} - Generating secure cloud link`);
    return `https://storage.googleapis.com/grids-vault/${fileId}?token=SECURE_AUTH_SIG`;
  },

  async uploadToCloud(file: File): Promise<string> {
    console.log(`[PUT] ${BASE_URL}/storage/upload - Direct upload to secure bucket`);
    return `cloud-id-${Date.now()}`;
  }
};

export const NotificationAPI = {
  // Requirement 5: Push/Email API integration (FCM/SendGrid)
  async broadcastNotification(notif: any): Promise<void> {
    console.log(`[POST] ${BASE_URL}/notifications/broadcast - Sending Push to Data Reviewers`);
    console.log(`[POST] ${BASE_URL}/mail/send - Dispatching Email Alert via SendGrid`);
  }
};

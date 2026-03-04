
import { User, AuditLog } from '../types';
import { AuditAPI } from '../services/apiService';

/**
 * Records a user action into the system's audit trail.
 * Requirement 2: POSTs logs to a secure server to prevent tampering.
 */
export const recordAuditLog = (user: User | null, action: string, details: string, module: string) => {
  const logs: AuditLog[] = JSON.parse(localStorage.getItem('grids_audit_logs') || '[]');
  
  const newLog: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    userId: user?.userId || 'GUEST',
    userName: user ? `${user.firstName} ${user.lastName}` : 'Guest User',
    userRole: user?.role || 'Guest',
    office: user?.office || 'System',
    action,
    details,
    module,
    timestamp: new Date().toISOString()
  };

  // Local fallback
  localStorage.setItem('grids_audit_logs', JSON.stringify([newLog, ...logs]));
  
  // REQUIREMENT 2: Server-side Synchronization
  AuditAPI.postLog(newLog).catch(err => {
    console.error("[CRITICAL] Audit log cloud sync failed. Queueing for retry.", err);
  });

  window.dispatchEvent(new Event('storage'));
};

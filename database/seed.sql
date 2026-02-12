
-- Seed data for GRIDS

-- Roles
INSERT INTO roles (role_id, role_name, description) VALUES 
('role_admin', 'Administrator', 'Full system access and user management'),
('role_provider', 'Data Provider', 'Upload and submit data sets'),
('role_reviewer', 'Data Reviewer', 'Validate and approve/deny submissions'),
('role_analyst', 'Data Analyst', 'Analyze approved data sets'),
('role_public', 'Public User', 'Access and download public information');

-- Departments
INSERT INTO departments (department_id, department_name) VALUES 
('dept_cpdso', 'City Planning, Development and Sustainability Office'),
('dept_cmo', 'City Mayor''s Office'),
('dept_health', 'City Health Services Office');

-- Offices
INSERT INTO offices (office_id, office_name, department_id) VALUES 
('off_cbms', 'CBMS Division', 'dept_cpdso'),
('off_gad', 'GAD Secretariat', 'dept_cpdso'),
('off_admin', 'Executive Admin', 'dept_cmo');

-- 1. Admin User
-- GRIDS DATABASE REGISTRY (Seed.sql)
-- Updated: 2/10/2026, 2:43:35 PM

INSERT INTO users (user_id, username, password_hash, email, first_name, last_name, role_id, office_id, contact_info, created_at, is_active)
VALUES ('u_admin_1', 'charles_admin', 'hashed_pwd_123', 'cbmscharles@gmail.com', 'Charles', 'Chantioco', 'role_admin', 'CPDSO', '442-3939', '2025-01-01T00:00:00.000Z', TRUE);

INSERT INTO users (user_id, username, password_hash, email, first_name, last_name, role_id, office_id, contact_info, created_at, is_active)
VALUES ('u_reg_775914', 'cbmsangie', 'PBKDF2_SIMULATED', 'cbmsangie@gmail.com', 'Angie', 'Ilagan', 'role_analyst', 'CPDSO', '', '2026-02-10T06:42:55.914Z', TRUE);
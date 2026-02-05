-- GRIDS (Gender-Responsive Integrated Database System)
-- PostgreSQL / Standard SQL Database Schema
-- Designed for Baguio City CPDSO

-- 1. ENUMS & TYPES
CREATE TYPE user_role AS ENUM ('Administrator', 'Data Provider', 'Data Reviewer', 'Guest');
CREATE TYPE submission_status AS ENUM ('Pending', 'Approved', 'Denied');

-- 2. OFFICES / DEPARTMENTS
-- Central repository for all city departments and GFPS units
CREATE TABLE offices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'CPDSO', 'CMO', 'CEPMO'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. USERS
-- System users with authentication and role-based access
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'Guest',
    office_id INTEGER REFERENCES offices(id) ON DELETE SET NULL,
    phone VARCHAR(20),
    landline VARCHAR(20),
    birthdate DATE,
    profile_picture_url TEXT,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. GAD SECTORS
-- Categories for indicators (e.g., Education, Economy, Health)
CREATE TABLE sectors (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'education-and-training'
    title VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50), -- Lucide icon reference
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. GAD INDICATORS
-- The core data points tracked by the system
CREATE TABLE indicators (
    id SERIAL PRIMARY KEY,
    sector_id INTEGER REFERENCES sectors(id) ON DELETE CASCADE,
    slug VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'literacy-rate'
    title TEXT NOT NULL,
    primary_office_id INTEGER REFERENCES offices(id),
    secondary_office_id INTEGER REFERENCES offices(id),
    definition TEXT,
    details JSONB, -- Stores nested info like "Basic/Simple Literacy" descriptions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. SUBMISSIONS (File Management)
-- Tracks file uploads and the review process
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(255) NOT NULL,
    submitted_by_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    office_id INTEGER REFERENCES offices(id) ON DELETE CASCADE,
    status submission_status DEFAULT 'Pending',
    reviewed_by_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    file_size_mb DECIMAL(10, 2),
    file_path TEXT NOT NULL, -- Path to storage location
    mime_type VARCHAR(100), -- e.g., 'application/vnd.ms-excel'
    reviewer_remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. GFPS DIRECTORY (People)
-- List of officials and focal persons
CREATE TABLE gfps_members (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Link to system user if they have an account
    full_name VARCHAR(255) NOT NULL,
    role_title VARCHAR(100), -- e.g., 'GFPS Chairperson'
    office_id INTEGER REFERENCES offices(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'Active', -- 'Active', 'Inactive'
    email VARCHAR(255),
    phone VARCHAR(20),
    joined_at DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. NOTIFICATIONS
-- System alerts for approvals, new data, and news
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    target_url TEXT, -- Link to the relevant resource (e.g., /view/sub-1)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. PROGRAMS & ACTIVITIES
-- Registry of GAD programs, projects, and services
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    office_id INTEGER REFERENCES offices(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    background_image_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR PERFORMANCE
-- Optimize search and filtering
CREATE INDEX idx_indicators_slug ON indicators(slug);
CREATE INDEX idx_sectors_slug ON sectors(slug);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_gfps_members_office ON gfps_members(office_id);

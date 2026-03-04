
-- SQL Schema for GRIDS (Gender-Responsive Integrated Database System)
-- Revised Based on the project's UML Class Diagram

-- 1. Roles and Organizational Structure
CREATE TABLE roles (
    role_id VARCHAR(50) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE departments (
    department_id VARCHAR(50) PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE offices (
    office_id VARCHAR(50) PRIMARY KEY,
    office_name VARCHAR(255) NOT NULL,
    department_id VARCHAR(50) REFERENCES departments(department_id)
);

-- 2. User Management
CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    contact_info TEXT, -- UML: contactInfo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- UML: createdAt
    last_login TIMESTAMP, -- UML: lastLogin
    is_active BOOLEAN DEFAULT TRUE, -- UML: isActive
    role_id VARCHAR(50) REFERENCES roles(role_id),
    department_id VARCHAR(50) REFERENCES departments(department_id),
    office_id VARCHAR(50) REFERENCES offices(office_id)
);

-- 3. Data Submissions
CREATE TABLE data_submissions (
    submission_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- UML: submissionDate
    status VARCHAR(20) DEFAULT 'Pending', -- UML: status
    submitted_by_user_id VARCHAR(50) REFERENCES users(user_id), -- UML: submittedByUserId
    approved_by_user_id VARCHAR(50) REFERENCES users(user_id), -- UML: approvedByUserId
    denied_by_user_id VARCHAR(50) REFERENCES users(user_id), -- UML: deniedByUserId
    comment TEXT, -- UML: comment
    optional_comment TEXT, -- UML: optionalComment
    office_id VARCHAR(50) REFERENCES offices(office_id)
);

CREATE TABLE data_sets (
    data_set_id VARCHAR(50) PRIMARY KEY,
    submission_id VARCHAR(50) REFERENCES data_submissions(submission_id) ON DELETE CASCADE,
    indicator_id VARCHAR(50), -- Associated with GADIndicator
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_type VARCHAR(50), -- UML: fileType
    format_guidelines TEXT, -- UML: formatGuidelines
    is_sensitive BOOLEAN DEFAULT FALSE, -- UML: isSensitive
    is_anonymized BOOLEAN DEFAULT FALSE, -- UML: isAnonymized
    collection_frequency VARCHAR(100), -- UML: collectionFrequency
    storage_location TEXT -- UML: storageLocation
);

-- 4. Review Workflow
CREATE TABLE review_processes (
    review_id VARCHAR(50) PRIMARY KEY,
    submission_id VARCHAR(50) REFERENCES data_submissions(submission_id) ON DELETE CASCADE,
    reviewer_user_id VARCHAR(50) REFERENCES users(user_id), -- UML: reviewerUserId
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- UML: reviewDate
    status VARCHAR(50),
    remarks TEXT,
    justification TEXT -- UML: justification
);

-- 5. GAD and Metadata
CREATE TABLE gad_indicators (
    indicator_id VARCHAR(50) PRIMARY KEY,
    indicator_name VARCHAR(255) NOT NULL,
    definition TEXT,
    source VARCHAR(255),
    category VARCHAR(100)
);

CREATE TABLE metadata (
    metadata_id VARCHAR(50) PRIMARY KEY,
    m_key VARCHAR(100) NOT NULL,
    m_value TEXT,
    description TEXT,
    applies_to VARCHAR(50) -- UML: appliesTo
);

-- 6. Notifications
CREATE TABLE notifications (
    notification_id VARCHAR(50) PRIMARY KEY,
    recipient_user_id VARCHAR(50) REFERENCES users(user_id) ON DELETE CASCADE, -- UML: recipientUserId
    message TEXT NOT NULL,
    n_type VARCHAR(50), -- UML: type
    n_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- UML: timestamp
    is_read BOOLEAN DEFAULT FALSE -- UML: isRead
);

-- Indexes for performance
CREATE INDEX idx_submission_user ON data_submissions(submitted_by_user_id);
CREATE INDEX idx_dataset_submission ON data_sets(submission_id);
CREATE INDEX idx_notification_user ON notifications(recipient_user_id);

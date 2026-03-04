
-- SEED DATA FOR GRIDS
-- Populating initial state

-- 1. Offices
INSERT INTO offices (name, acronym) VALUES 
('City Mayor''s Office', 'CMO'),
('City Planning, Development, and Sustainability Office', 'CPDSO'),
('City Health Services Office', 'CHSO'),
('City Social Welfare and Development Office', 'CSWDO'),
('City Environment and Parks Management Office', 'CEPMO');

-- 2. Sectors
INSERT INTO sectors (slug, title, icon_name, image_url) VALUES 
('education-and-training', 'Education and Training', 'GraduationCap', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200'),
('economy', 'Economy', 'TrendingUp', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200'),
('health', 'Health', 'Heart', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200');

-- 3. Indicators (Sample)
INSERT INTO indicators (sector_id, slug, title, primary_office_id, definition) VALUES 
(1, 'literacy-rate', 'Basic and Functional Literacy Rate, by Sex', 2, 'The ability of a person to read, write, and compute with understanding basic or functional messages in any language.'),
(2, 'labor-participation', 'Labor Force Participation Rate, by Sex and Age Group', 2, 'Proportion of the total labor force to the total household population aged 15 years old and over.');

-- 4. Initial GFPS Members
INSERT INTO gfps_members (full_name, role_title, office_id, email, joined_at) VALUES 
('Alice Walker', 'Administrator', 2, 'cpdso.awalker@gmail.com', '2019-09-12'),
('John Doe', 'Data Reviewer', 1, 'cmo.johndoe@gmail.com', '2020-10-29');

-- 5. Official CBMS Reports
INSERT INTO cbms_reports (title, section, year, file_path, file_size_mb, release_date, summary) VALUES
('2021 Community-Based Monitoring System (CBMS) Data Report: Section E - Economic Characteristics', 'E', 2021, '/reports/cbms_2021_section_e.pdf', 4.8, '2021-12-01', 'Official data report covering labor force participation, working arrangements, and employment stability.'),
('2021 Community-Based Monitoring System (CBMS) Data Report: Section L - Agricultural Activities', 'L', 2021, '/reports/cbms_2021_section_l.pdf', 3.2, '2021-12-01', 'Detailed report on agricultural land ownership, activity engagement, and livestock raised in Baguio City.'),
('2021 Community-Based Monitoring System (CBMS) Data Report: Section P - Government Programs', 'P', 2021, '/reports/cbms_2021_section_p.pdf', 5.1, '2021-12-01', 'Consolidated report on household enrollment and availment of social protection and government assistance programs.');

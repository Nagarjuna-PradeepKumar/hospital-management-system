-- 
--  MIGRATION UP
-- 
-- +migrate Up
-- +migrate StatementBegin
-- Create Table Users
CREATE TABLE IF NOT EXISTS users(
    id uuid not null constraint user_pk primary key,
    user_name text not null,
    display_name text not null,
    CONSTRAINT unique_user_name UNIQUE (display_name),
    user_password text not null,
    phone_no varchar(15),
    last_login timestamp,
    created_at timestamp not null,
    updated_at timestamp
);
CREATE INDEX IF NOT EXISTS idx_users_user_name ON users (user_name);
CREATE INDEX IF NOT EXISTS idx_users_phone_no ON users (phone_no);

-- Create Table User Address
CREATE TABLE IF NOT EXISTS user_address(
    id uuid not null constraint user_address_pk primary key,
    user_id uuid not null constraint user_address_fk references users,
    user_address text not null,
    landmark text not null,
    pin_code int,
    created_at timestamp not null,
    updated_at timestamp
);
CREATE INDEX IF NOT EXISTS idx_user_address_user_id ON user_address (user_id);

-- Create Table User Roles
CREATE TABLE IF NOT EXISTS user_roles(
    id uuid not null constraint role_pk primary key,
    user_id uuid not null constraint user_user_role_fk references users,
    user_role int not null,
    created_at timestamp not null,
    CONSTRAINT unique_user_user_role UNIQUE (user_id, user_role)
);

-- Create Table Patient Details
CREATE TABLE IF NOT EXISTS patient_details(
    id uuid not null constraint patient_details_pk primary key,
    user_id uuid not null constraint user_patient_details_fk references users,
    gender int not null,
    age int not null,
    age_at_timestamp timestamp not null,
    occupation text,
    marita_status int,
    blood_group varchar(6),
    created_at timestamp not null,
    updated_at timestamp
);
CREATE INDEX IF NOT EXISTS idx_patient_details_user_id ON patient_details (user_id);

-- Create Table Doctors
CREATE TABLE IF NOT EXISTS doctors(
    id uuid not null constraint doctor_pk primary key,
    user_id uuid not null constraint user_doctor_fk references users,
    specialist text not null,
    CONSTRAINT unique_user_id UNIQUE (user_id),
    created_at timestamp not null,
    updated_at timestamp
);

-- Create Table Complaints
CREATE TABLE IF NOT EXISTS complaints(
    id uuid not null constraint complaint_pk primary key,
    complaint text,
    interpretation text,
    created_at timestamp not null,
    updated_at timestamp
);

-- Create Table Consultations
CREATE TABLE IF NOT EXISTS consultations(
    id uuid not null constraint consultation_pk primary key,
    patient_id uuid not null constraint consultation_patient_details_fk references patient_details,
    doctor_id uuid not null constraint patient_details_doctor_fk references doctors,
    complaint_id uuid not null constraint consultation_complaint_fk references complaints,
    created_at timestamp not null,
    updated_at timestamp
);
CREATE INDEX IF NOT EXISTS idx_consultations_patient_id ON consultations (patient_id);

-- Create Table Patient History
CREATE TABLE IF NOT EXISTS patient_history(
    id uuid not null constraint patient_history_pk primary key,
    patient_id uuid not null constraint patient_history_patient_fk references patient_details,
    medicine text not null,
    morning boolean default false,
    morning_before_after int not null,
    afternoon boolean default false,
    afternoon_before_after int not null,
    night boolean default false,
    night_before_after int not null,
    created_at timestamp not null,
    updated_at timestamp
);
CREATE INDEX IF NOT EXISTS idx_patient_history_patient_id ON patient_history (patient_id);

-- Create Table Patient Medicine
CREATE TABLE IF NOT EXISTS patient_medicine(
    id uuid not null constraint patient_medicine_pk primary key,
    consultation_id uuid not null constraint patient_medicine_consultation_fk references consultations,
    medicine text not null,
    morning boolean default false,
    morning_before_after int not null,
    afternoon boolean default false,
    afternoon_before_after int not null,
    night boolean default false,
    night_before_after int not null,
    created_at timestamp not null,
    updated_at timestamp
);
CREATE INDEX IF NOT EXISTS idx_patient_medicine_consultation_id ON patient_medicine (consultation_id);

-- Create Table Lab Tests
CREATE TABLE IF NOT EXISTS lab_tests(
    id uuid not null constraint lab_tests_pk primary key,
    consultation_id uuid not null constraint lab_tests_consultation_fk references consultations,
    tests_suggested jsonb,
    created_at timestamp not null,
    updated_at timestamp
);

-- Create Table Documents
CREATE TABLE IF NOT EXISTS documents(
    id uuid not null constraint documents_pk primary key,
    file_location text not null,
    created_at timestamp not null,
    updated_at timestamp
);

-- Create Table Lab Test Results
CREATE TABLE IF NOT EXISTS lab_test_results(
    id uuid not null constraint lab_test_results_pk primary key,
    lab_test_id uuid not null constraint lab_test_results_lab_test_fk references lab_tests,
    documents uuid not null constraint lab_tests_results_documents_fk references documents,
    result text not null,
    created_at timestamp not null,
    updated_at timestamp
);
-- +migrate StatementEnd

-- 
--  MIGRATION DOWN
-- 
-- +migrate Down
-- +migrate StatementBegin
-- Drop table lab_test_results
DROP TABLE IF EXISTS lab_test_results;


-- Drop table documents
DROP TABLE IF EXISTS documents;

-- Drop table lab_tests
DROP TABLE IF EXISTS lab_tests;


-- Drop table patient_medicine
DROP TABLE IF EXISTS patient_medicine;
DROP INDEX IF EXISTS idx_patient_medicine_consultation_id;

-- Drop table patient_history
DROP TABLE IF EXISTS patient_history;
DROP INDEX IF EXISTS idx_patient_history_patient_id;

-- Drop table consultations
DROP TABLE IF EXISTS consultations;
DROP INDEX IF EXISTS idx_consultations_patient_id;

-- Drop table complaints
DROP TABLE IF EXISTS complaints;

-- Drop table doctors
DROP TABLE IF EXISTS doctors;

-- Drop table patient_details
DROP TABLE IF EXISTS patient_details;
DROP INDEX IF EXISTS idx_patient_details_user_id;

-- Drop table user_roles
DROP TABLE IF EXISTS user_roles;

-- Drop table user_address
DROP TABLE IF EXISTS user_address;
DROP INDEX IF EXISTS idx_user_address_user_id;


-- Drop table users
DROP TABLE IF EXISTS users;
DROP INDEX IF EXISTS idx_users_user_name;
DROP INDEX IF EXISTS idx_users_phone_no;
-- +migrate StatementEnd
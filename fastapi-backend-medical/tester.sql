/*
medical_consultation
ketosis
topographic_exploration
phsycal_examination
medical_diagnosis
lab_requests_and_image
medical_procedure
medical_prescription
medical_prescription_detail


user_id INT AUTO_INCREMENT PRIMARY KEY,
FOREIGN KEY (user_id) REFERENCES users(user_id) 
*/

CREATE TABLE medical_consultation (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    notes TEXT,
    medical_instructions TEXT,
    treatment_plan TEXT,
    FOREIGN KEY(patient_id) REFERENCES pacientes(id)
);

CREATE TABLE ketosis (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_consultation_id VARCHAR(100) NOT NULL,
    satiety TINYINT CHECK (satiety BETWEEN 0 AND 3),
    cramps TINYINT CHECK (cramps BETWEEN 0 AND 3),
    diarrhea TINYINT CHECK (diarrhea BETWEEN 0 AND 3),
    depressed TINYINT CHECK (depressed BETWEEN 0 AND 3),
    tolerance TINYINT CHECK (tolerance BETWEEN 0 AND 3),
    constipation TINYINT CHECK (constipation BETWEEN 0 AND 3),
    dizziness TINYINT CHECK (dizziness BETWEEN 0 AND 3),
    anxiety TINYINT CHECK (anxiety BETWEEN 0 AND 3),
    irritability TINYINT CHECK (irritability BETWEEN 0 AND 3),
    impulse_control TINYINT CHECK (impulse_control BETWEEN 0 AND 3),
    bad_breath TINYINT CHECK (bad_breath BETWEEN 0 AND 3),
    hunger TINYINT CHECK (hunger BETWEEN 0 AND 3),
    sleep_problems TINYINT CHECK (sleep_problems BETWEEN 0 AND 3),
    impatience TINYINT CHECK (impatience BETWEEN 0 AND 3),
    need_for_stimulants TINYINT CHECK (need_for_stimulants BETWEEN 0 AND 3),
    migraine_or_headache TINYINT CHECK (migraine_or_headache BETWEEN 0 AND 3),
    fatigue TINYINT CHECK (fatigue BETWEEN 0 AND 3),
    concentration TINYINT CHECK (concentration BETWEEN 0 AND 3),
    aggressiveness TINYINT CHECK (aggressiveness BETWEEN 0 AND 3),
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);


CREATE TABLE topographic_exploration (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_consultation_id VARCHAR(100) NOT NULL,
    head_front_part TEXT,
    head_back_part TEXT,
    neck_front_part TEXT,
    neck_back_part TEXT,
    upper_limb_left_front_part TEXT,
    upper_limb_left_back_part TEXT,
    upper_limb_right_front_part TEXT,
    upper_limb_right_back_part TEXT,
    trunk_front_part TEXT,
    trunk_back_part TEXT,
    lower_limb_left_front_part TEXT,
    lower_limb_left_back_part TEXT,
    lower_limb_right_front_part TEXT,
    lower_limb_right_back_part TEXT,
    pelvic_area_front TEXT,
    pelvic_area_back TEXT,
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);

CREATE TABLE phsycal_examination (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_consultation_id VARCHAR(100) NOT NULL,
    digestive_system TEXT,
    reproductive_system TEXT,
    urinary_system TEXT,
    cardiac_and_vascular TEXT,
    dental TEXT,
    dermatological TEXT,
    neurological TEXT,
    osteoarticular TEXT,
    otolaryngologist TEXT,
    psychiatric_and_psychological TEXT,
    pulmonary_or_respiratory TEXT,
    lymphatic_system TEXT,
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);

CREATE TABLE medical_diagnosis (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_consultation_id VARCHAR(100) NOT NULL,
    code VARCHAR(15),
    description TEXT,
    notes text,
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);


CREATE TABLE lab_requests_and_image (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_consultation_id VARCHAR(100) NOT NULL,
    name VARCHAR(200) NOT NULL,
    notes TEXT,
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);

CREATE TABLE medical_procedure(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_consultation_id VARCHAR(100) NOT NULL,
    name VARCHAR(200) NOT NULL,
    notes TEXT,
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);


CREATE TABLE medical_prescription(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_consultation_id VARCHAR(100) NOT NULL,
    medical_instructions TEXT,
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);


CREATE TABLE medical_prescription_detail(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    medical_prescription_id INT NOT NULL,
    name VARCHAR(300) NOT NULL,
    dose VARCHAR(100),
    frequency VARCHAR(100),
    duration_of_treatment VARCHAR(100),
    FOREIGN KEY(medical_prescription_id) REFERENCES medical_prescription(id)
);

CREATE TABLE lab_results_by_medical_consultation(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    lab_result_id INT NOT NULL,
    medical_consultation_id VARCHAR(100) NOT NULL,
    FOREIGN KEY(lab_result_id) REFERENCES lab_results(id),
    FOREIGN KEY(medical_consultation_id) REFERENCES medical_consultation(id)
);



ALTER TABLE events ADD column date DATE NOT NULL;

CREATE TABLE events (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    hour TIME NOT NULL, 
    date DATE NOT NULL,
    asocciate_patient TINYINT(1) DEFAULT null,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE prospective_patients(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    contact_number VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE event_patient (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    event_id VARCHAR(100) NOT NULL,
    patient_id VARCHAR(100) NOT NULL, 
    FOREIGN KEY(event_id) REFERENCES events(id),
    FOREIGN KEY(patient_id) REFERENCES pacientes(id)
);

CREATE TABLE event_prospective_patient (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    prospective_patient_id INT NOT NULL, 
    event_id VARCHAR(100) NOT NULL,
    FOREIGN KEY(event_id) REFERENCES events(id),
    FOREIGN KEY(prospective_patient_id) REFERENCES prospective_patients(id) 
);
package com.hms.server.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Stores specific details for a patient, linked to a User account.
 */
@Entity
@Table(name = "patient_details")
@Data
@NoArgsConstructor
public class PatientDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(length = 10)
    private String gender; // e.g., "Male", "Female", "Other"

    @Column(length = 20)
    private String contactNumber;

    @Column(name = "blood_group", length = 5)
    private String bloodGroup;

    // One-to-One relationship with User
    // JoinColumn specifies the foreign key column in 'patient_details' table
    // referring to 'users' table.
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = false)
    private User user;

    // One-to-Many relationship with Consultation
    // Mapped by the 'patient' field in Consultation entity.
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Consultation> consultations;

    // One-to-One relationship with PatientHistory
    // Mapped by the 'patient' field in PatientHistory entity.
    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private PatientHistory patientHistory;

    public PatientDetails(String firstName, String lastName, LocalDate dateOfBirth, String gender, String contactNumber,
            String bloodGroup) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.bloodGroup = bloodGroup;
    }

    public void setPatientHistory(PatientHistory patientHistory) {
        if (patientHistory != null) {
            patientHistory.setPatient(this);
        }
        this.patientHistory = patientHistory;
    }

    @Override
    public String toString() {
        return "PatientDetails{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", gender='" + gender + '\'' +
                '}';
    }
}

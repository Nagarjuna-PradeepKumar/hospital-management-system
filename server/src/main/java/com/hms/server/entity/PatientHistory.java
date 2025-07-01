package com.hms.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Stores the medical history of a patient, linked to PatientDetails.
 */
@Entity
@Table(name = "patient_history")
@Data
@NoArgsConstructor
public class PatientHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String allergies;

    @Column(name = "past_illnesses", columnDefinition = "TEXT")
    private String pastIllnesses;

    @Column(columnDefinition = "TEXT")
    private String surgeries;

    @Column(columnDefinition = "TEXT")
    private String medications; // Current or past medications not related to a specific consultation

    // One-to-One relationship with PatientDetails
    // JoinColumn specifies the foreign key column in 'patient_history' table
    // referring to 'patient_details'.
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", referencedColumnName = "id", unique = true, nullable = false)
    private PatientDetails patient;

    public PatientHistory(String allergies, String pastIllnesses, String surgeries, String medications) {
        this.allergies = allergies;
        this.pastIllnesses = pastIllnesses;
        this.surgeries = surgeries;
        this.medications = medications;
    }

    @Override
    public String toString() {
        return "PatientHistory{" +
                "id=" + id +
                ", allergies='" + allergies + '\'' +
                ", pastIllnesses='" + pastIllnesses + '\'' +
                '}';
    }
}
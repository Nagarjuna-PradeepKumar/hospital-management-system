package com.hms.server.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a medicine prescribed to a patient during a specific consultation.
 */
@Entity
@Table(name = "patient_medicines") // Renamed from 'patient_medicine' to 'patient_medicines'
@Data
@NoArgsConstructor
public class PatientMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "medicine_name", nullable = false, length = 255)
    private String medicineName;

    @Column(length = 100)
    private String dosage; // e.g., "500mg", "1 tablet"

    @Column(length = 100)
    private String frequency; // e.g., "Twice daily", "Before meals"

    @Column(length = 50)
    private String duration; // e.g., "7 days", "Until finished"

    // Many-to-One relationship with Consultation
    // JoinColumn specifies the foreign key column in 'patient_medicines' table
    // referring to 'consultations'.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id", nullable = false)
    private Consultation consultation;

    // Many-to-One relationship with MedicineSuggestions (optional, for linking to a
    // master list)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_suggestion_id") // This column is nullable as not all medicines might come from
                                                 // suggestions
    private MedicineSuggestions medicineSuggestion;

    public PatientMedicine(String medicineName, String dosage, String frequency, String duration) {
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "PatientMedicine{" +
                "id=" + id +
                ", medicineName='" + medicineName + '\'' +
                ", dosage='" + dosage + '\'' +
                '}';
    }
}

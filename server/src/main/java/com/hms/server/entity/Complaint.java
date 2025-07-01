package com.hms.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a specific complaint or symptom reported during a consultation.
 */
@Entity
@Table(name = "complaints") // Renamed from 'complaint' to 'complaints'
@Data
@NoArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    // Many-to-One relationship with Consultation
    // JoinColumn specifies the foreign key column in 'complaints' table referring
    // to 'consultations'.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id", nullable = false)
    private Consultation consultation;

    public Complaint(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Complaint{" +
                "id=" + id +
                ", description='" + description + '\'' +
                '}';
    }
}

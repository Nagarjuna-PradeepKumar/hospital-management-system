package com.hms.server.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a master list of suggested medicines.
 * PatientMedicine can refer to this list.
 */
@Entity
@Table(name = "medicine_suggestions")
@Data
@NoArgsConstructor
public class MedicineSuggestions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String name; // e.g., "Paracetamol", "Amoxicillin"

    @Column(columnDefinition = "TEXT")
    private String description; // Details about the medicine

    // One-to-Many relationship with PatientMedicine
    // Mapped by the 'medicineSuggestion' field in PatientMedicine entity.
    @OneToMany(mappedBy = "medicineSuggestion", fetch = FetchType.LAZY)
    private Set<PatientMedicine> patientMedicines;

    public MedicineSuggestions(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public String toString() {
        return "MedicineSuggestions{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

package com.hms.server.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "consultations") // Renamed from 'consultation' to 'consultations'
@Data
@NoArgsConstructor
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "consultation_date", nullable = false)
    private LocalDateTime consultationDate;

    @Column(length = 255)
    private String diagnosis;

    @Column(columnDefinition = "TEXT") // Use TEXT for potentially long notes
    private String notes;

    // Many-to-One relationship with PatientDetails
    // JoinColumn specifies the foreign key column in 'consultations' table
    // referring to 'patient_details'.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientDetails patient;

    // Many-to-One relationship with DoctorDetails
    // JoinColumn specifies the foreign key column in 'consultations' table
    // referring to 'doctor_details'.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private DoctorDetails doctor;

    // One-to-Many relationship with Complaint
    // Mapped by the 'consultation' field in Complaint entity.
    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Complaint> complaints;

    // One-to-Many relationship with PatientMedicine
    // Mapped by the 'consultation' field in PatientMedicine entity.
    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<PatientMedicine> patientMedicines;

    // One-to-Many relationship with LabTest
    // Mapped by the 'consultation' field in LabTest entity.
    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<LabTest> labTests;

    public Consultation(LocalDateTime consultationDate, String diagnosis, String notes) {
        this.consultationDate = consultationDate;
        this.diagnosis = diagnosis;
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Consultation{" +
                "id=" + id +
                ", consultationDate=" + consultationDate +
                ", diagnosis='" + diagnosis + '\'' +
                '}';
    }
}

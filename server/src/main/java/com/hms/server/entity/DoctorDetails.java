package com.hms.server.entity;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Stores specific details for a doctor, linked to a User account.
 */
@Entity
@Table(name = "doctor_details")
@Data
@NoArgsConstructor
public class DoctorDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, length = 100)
    private String specialization;

    @Column(length = 20)
    private String contactNumber;

    @Column(name = "license_number", unique = true, length = 50)
    private String licenseNumber;

    // One-to-One relationship with User
    // JoinColumn specifies the foreign key column in 'doctor_details' table
    // referring to 'users' table.
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = false)
    private User user;

    // One-to-Many relationship with Consultation
    // Mapped by the 'doctor' field in Consultation entity.
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Consultation> consultations;

    public DoctorDetails(String firstName, String lastName, String specialization, String contactNumber,
            String licenseNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.contactNumber = contactNumber;
        this.licenseNumber = licenseNumber;
    }

    @Override
    public String toString() {
        return "DoctorDetails{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", specialization='" + specialization + '\'' +
                '}';
    }
}
package com.hms.server.entity;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a lab test ordered during a consultation.
 */
@Entity
@Table(name = "lab_tests") // Renamed from 'lab_test' to 'lab_tests'
@Data
@NoArgsConstructor
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_name", nullable = false, length = 255)
    private String testName;

    @Column(name = "test_date")
    private LocalDate testDate;

    @Column(length = 50)
    private String status; // e.g., "PENDING", "COMPLETED", "CANCELLED"

    // Many-to-One relationship with Consultation
    // JoinColumn specifies the foreign key column in 'lab_tests' table referring to
    // 'consultations'.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id", nullable = false)
    private Consultation consultation;

    // One-to-One relationship with LabTestResults
    // Mapped by the 'labTest' field in LabTestResults entity.
    @OneToOne(mappedBy = "labTest", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private LabTestResults labTestResults;

    public LabTest(String testName, LocalDate testDate, String status) {
        this.testName = testName;
        this.testDate = testDate;
        this.status = status;
    }

    public void setLabTestResults(LabTestResults labTestResults) {
        if (labTestResults != null) {
            labTestResults.setLabTest(this);
        }
        this.labTestResults = labTestResults;
    }

    @Override
    public String toString() {
        return "LabTest{" +
                "id=" + id +
                ", testName='" + testName + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

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
 * Stores the results for a specific lab test.
 */
@Entity
@Table(name = "lab_test_results")
@Data
@NoArgsConstructor
public class LabTestResults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "result_value", columnDefinition = "TEXT") // Can be numerical or descriptive
    private String resultValue;

    @Column(length = 50)
    private String unit; // e.g., "mg/dL", "%"

    @Column(columnDefinition = "TEXT")
    private String notes; // Any additional notes about the result

    // One-to-One relationship with LabTest
    // JoinColumn specifies the foreign key column in 'lab_test_results' table
    // referring to 'lab_tests'.
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lab_test_id", referencedColumnName = "id", unique = true, nullable = false)
    private LabTest labTest;

    public LabTestResults(String resultValue, String unit, String notes) {
        this.resultValue = resultValue;
        this.unit = unit;
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "LabTestResults{" +
                "id=" + id +
                ", resultValue='" + resultValue + '\'' +
                ", unit='" + unit + '\'' +
                '}';
    }
}
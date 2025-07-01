package com.hms.server.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users") // Renamed from 'user' to 'users' to avoid SQL keyword conflict
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password; // In a real application, store hashed passwords

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private Boolean enabled = true; // Account enabled/disabled status

    // One-to-One relationship with Address
    // CascadeType.ALL means if a User is deleted, their Address is also deleted.
    // OrphanRemoval ensures that if an address is disassociated from a user, it's
    // removed.
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Address address;

    // Many-to-Many relationship with UserRole
    // JoinTable specifies the join table and join columns for this relationship.
    @ManyToMany(fetch = FetchType.EAGER) // Fetch roles eagerly as they are often needed
    @JoinTable(name = "user_roles_mapping", // Name of the join table
            joinColumns = @JoinColumn(name = "user_id"), // Column in join table referring to User
            inverseJoinColumns = @JoinColumn(name = "role_id") // Column in join table referring to UserRole
    )
    private Set<UserRole> roles = new HashSet<>();

    // One-to-One relationship with PatientDetails
    // Mapped by the 'user' field in PatientDetails entity
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private PatientDetails patientDetails;

    // One-to-One relationship with DoctorDetails
    // Mapped by the 'user' field in DoctorDetails entity
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private DoctorDetails doctorDetails;

    // You can keep custom methods like addRole/removeRole if needed
    public void addRole(UserRole role) {
        this.roles.add(role);
        role.getUsers().add(this);
    }

    public void removeRole(UserRole role) {
        this.roles.remove(role);
        role.getUsers().remove(this);
    }

    public void setAddress(Address address) {
        if (address != null) {
            address.setUser(this);
        }
        this.address = address;
    }

    public void setPatientDetails(PatientDetails patientDetails) {
        if (patientDetails != null) {
            patientDetails.setUser(this);
        }
        this.patientDetails = patientDetails;
    }

    public void setDoctorDetails(DoctorDetails doctorDetails) {
        if (doctorDetails != null) {
            doctorDetails.setUser(this);
        }
        this.doctorDetails = doctorDetails;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}

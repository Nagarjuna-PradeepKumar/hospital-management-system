package com.hms.server.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a role that can be assigned to a user (e.g., ADMIN, DOCTOR,
 * PATIENT).
 * This entity is part of a Many-to-Many relationship with the User entity.
 */
@Entity
@Table(name = "user_roles") // Renamed from 'user_role' to 'user_roles'
@Data
@NoArgsConstructor
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String name; // e.g., "ROLE_ADMIN", "ROLE_DOCTOR", "ROLE_PATIENT"

    // Many-to-Many relationship with User
    // MappedBy refers to the 'roles' field in the User entity, indicating the
    // owning side.
    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    public UserRole(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "UserRole{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

package org.example.teamtasker.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;

    private String projectId;
    private String name;
    private String description;

    private String status;    // Task status (example: "todo", "in_progress", "done")
    private String assignedTo; // ID of the user assigned to the task (can be null if no one is assigned)

    private LocalDateTime createdAt; // Date of Creation
    private LocalDateTime dueDate;   // (optional)

    private LocalDateTime lastUpdated;
}

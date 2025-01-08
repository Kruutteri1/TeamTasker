package org.example.teamtasker.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateTaskRequestDTO {

    @Size(max = 50, message = "Task name cannot exceed 50 characters")
    private String name;
    private String description;
    private String status;
    private String assignedTo;

    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}(:\\d{2}(\\.\\d{1,3})?)?Z?", message = "Invalid ISO 8601 format")
    private String dueDate;
}

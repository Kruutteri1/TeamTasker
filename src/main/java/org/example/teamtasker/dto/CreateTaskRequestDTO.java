package org.example.teamtasker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateTaskRequestDTO {
    @NotBlank(message = "Project ID is required")
    private String projectId;

    @NotBlank(message = "Task name is required")
    @Size(max = 50, message = "Task name cannot exceed 50 characters")
    private String name;

    private String description;

    private String assignedTo;

    @NotBlank(message = "Due Date is required")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}(:\\d{2}(\\.\\d{1,3})?)?Z?", message = "Invalid ISO 8601 format")
    private String dueDate;
}

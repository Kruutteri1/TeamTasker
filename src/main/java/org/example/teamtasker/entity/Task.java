package org.example.teamtasker.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
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
    private ObjectId id;

    private ObjectId projectId;
    private String name;
    private String description;

    private String status;    // Статус задачи (например: "todo", "in_progress", "done")
    private String assignedTo; // ID пользователя, назначенного на задачу (может быть null, если никто не назначен)

    private LocalDateTime createdAt; // Дата создания
    private LocalDateTime dueDate;   // Срок выполнения (опционально)
}

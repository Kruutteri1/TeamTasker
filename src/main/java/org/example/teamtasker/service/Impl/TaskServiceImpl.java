package org.example.teamtasker.service.Impl;

import org.example.teamtasker.entity.Task;
import org.example.teamtasker.repository.TaskRepository;
import org.example.teamtasker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getTaskList(String projectId) {
        return taskRepository.findAllTasksByProjectId(projectId);
    }

    @Override
    public Task createTask(String projectId, String name, String description, String assignedTo, String dueDate) {
        if (dueDate == null || dueDate.isEmpty()) throw new IllegalArgumentException("Due date is required");

        Task newTask = new Task();
        newTask.setProjectId(projectId);
        newTask.setName(name);
        newTask.setDescription(description);
        newTask.setStatus("todo");
        newTask.setAssignedTo(assignedTo);

        LocalDateTime createdAt = LocalDateTime.now();
        newTask.setCreatedAt(createdAt);

        try {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime parsedDueDateTime = LocalDateTime.parse(dueDate, dateFormatter);
            newTask.setDueDate(parsedDueDateTime);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid due date format. Expected format: yyyy-MM-dd HH:mm");
        }

        return taskRepository.save(newTask);
    }

    @Override
    public Task updateTask(String taskId, String name, String description, String status, String assignedTo, String dueDate) {
        Task existingTask = taskRepository.findTaskById(taskId)
                .orElseThrow(() -> new RuntimeException("Task with id: " + taskId + " not found"));

        if (name != null && !name.isEmpty()) {
            existingTask.setName(name);
        }

        if (description != null && !description.isEmpty()) {
            existingTask.setDescription(description);
        }

        if (status != null && !status.isEmpty()) {
            existingTask.setStatus(status);
        }

        if (assignedTo != null && !assignedTo.isEmpty()) {
            existingTask.setAssignedTo(assignedTo);
        }

        if (dueDate != null && !dueDate.isEmpty()) {
            try {
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                LocalDateTime parsedDueDateTime = LocalDateTime.parse(dueDate, dateFormatter);
                existingTask.setDueDate(parsedDueDateTime);
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid due date format. Expected format: yyyy-MM-dd HH:mm");
            }
        }

        existingTask.setLastUpdated(LocalDateTime.now());
        return taskRepository.save(existingTask);
    }

    @Override
    public ResponseEntity<String> deleteTaskById(String taskId) {
        Optional<Task> task = taskRepository.findTaskById(taskId);

        if (task.isPresent()) {
            taskRepository.deleteTaskById(taskId);
            return new ResponseEntity<>("Task with ID: " + taskId + " has been deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Task with ID: " + taskId + " not found", HttpStatus.NOT_FOUND);
        }
    }
}

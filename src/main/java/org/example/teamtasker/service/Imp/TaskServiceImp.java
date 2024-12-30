package org.example.teamtasker.service.Imp;

import org.bson.types.ObjectId;
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
public class TaskServiceImp implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImp(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getTaskList(String projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public Task createTask(String projectId, String name, String description, String status, String assignedTo, String dueDate) {
        if (dueDate == null || dueDate.isEmpty()) throw new IllegalArgumentException("Due date is required");

        Task newTask = new Task();
        ObjectId projectObjectId = new ObjectId(projectId);
        newTask.setProjectId(projectObjectId);
        newTask.setName(name);
        newTask.setDescription(description);
        newTask.setStatus(status);
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
    public Task updateTask(String taskId, String projectId, String name, String description, String status, String assignedTo, String dueDate) {
        if (taskRepository.findTaskById(taskId).isEmpty()) throw new RuntimeException("Task with: " + taskId + " id not found");


        return null;
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

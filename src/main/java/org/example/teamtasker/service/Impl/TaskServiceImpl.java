package org.example.teamtasker.service.Impl;

import io.micrometer.common.util.StringUtils;
import org.example.teamtasker.entity.Task;
import org.example.teamtasker.entity.User;
import org.example.teamtasker.repository.ProjectParticipantRepository;
import org.example.teamtasker.repository.TaskRepository;
import org.example.teamtasker.repository.UserRepository;
import org.example.teamtasker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private final UserRepository userRepository;
    private final ProjectParticipantRepository participantRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, ProjectParticipantRepository participantRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.participantRepository = participantRepository;
    }

    @Override
    public List<Task> getTaskList(String projectId) {
        return taskRepository.findAllTasksByProjectId(projectId);
    }

    @Override
    public Task createTask(String projectId, String name, String description, String assignedTo, String dueDate) {
        Task newTask = new Task();
        newTask.setProjectId(projectId);
        newTask.setName(name);
        newTask.setDescription(description);
        newTask.setStatus("todo");

        if (StringUtils.isBlank(assignedTo)) {
            newTask.setAssignedTo("Unassigned");
        } else {
            newTask.setAssignedTo(assignedTo);
        }

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

        if (StringUtils.isNotBlank(name)) {
            existingTask.setName(name);
        }

        if (StringUtils.isNotBlank(description)) {
            existingTask.setDescription(description);
        }

        if (StringUtils.isNotBlank(status)) {
            existingTask.setStatus(status);
        }

        if (StringUtils.isNotBlank(assignedTo)) {
            String userId = participantRepository.findById(assignedTo)
                    .map(participant -> String.valueOf(participant.getUserId()))
                    .orElseThrow(() -> new UsernameNotFoundException("Project participant not found for ID: " + assignedTo));

            String authorName = userRepository.findById(userId)
                    .map(User::getAuthorName)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found for User ID: " + userId));

            existingTask.setAssignedTo(authorName);
        }

        if (StringUtils.isNotBlank(dueDate)) {
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

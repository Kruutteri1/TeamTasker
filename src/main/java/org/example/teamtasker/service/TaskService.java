package org.example.teamtasker.service;

import org.example.teamtasker.entity.Task;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskService {

    List<Task> getTaskList(String projectId);

    Task createTask(String projectId, String name, String description, String status, String assignedTo, String dueDate);

    Task updateTask(String taskId, String projectId, String name, String description, String status, String assignedTo, String dueDate);

    ResponseEntity<String> deleteTaskById(String taskId);


}

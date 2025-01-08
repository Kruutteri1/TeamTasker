package org.example.teamtasker.controller;

import jakarta.validation.Valid;
import org.example.teamtasker.dto.CreateTaskRequestDTO;
import org.example.teamtasker.dto.UpdateTaskRequestDTO;
import org.example.teamtasker.entity.Task;
import org.example.teamtasker.service.Impl.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team-tasker/projects/tasks")
public class TaskController {

    private final TaskServiceImpl taskService;

    @Autowired
    public TaskController(TaskServiceImpl taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{projectId}")
    public List<Task> getTaskList(@PathVariable String projectId) {
        return taskService.getTaskList(projectId);
    }

    @PostMapping("/create-new-task")
    public Task createNewTask(@RequestBody @Valid CreateTaskRequestDTO createTaskRequestDTO) {
        return taskService.createTask(createTaskRequestDTO.getProjectId(),
                createTaskRequestDTO.getName(),
                createTaskRequestDTO.getDescription(),
                createTaskRequestDTO.getAssignedTo(),
                createTaskRequestDTO.getDueDate());
    }

    @PutMapping("/update/{taskId}")
    public Task updateTask(@PathVariable String taskId,
                           @RequestBody @Valid UpdateTaskRequestDTO updateTaskRequestDTO) {
        return taskService.updateTask(taskId,
                updateTaskRequestDTO.getName(),
                updateTaskRequestDTO.getDescription(),
                updateTaskRequestDTO.getStatus(),
                updateTaskRequestDTO.getAssignedTo(),
                updateTaskRequestDTO.getDueDate());
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable String taskId) {
        return taskService.deleteTaskById(taskId);
    }
}

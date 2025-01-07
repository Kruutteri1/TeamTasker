package org.example.teamtasker.controller;

import org.example.teamtasker.entity.Task;
import org.example.teamtasker.service.Impl.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

package org.example.teamtasker.controller;

import org.example.teamtasker.service.Imp.TaskServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/team-tasker/tasks")
public class TaskController {

    private final TaskServiceImp taskService;

    @Autowired
    public TaskController(TaskServiceImp taskService) {
        this.taskService = taskService;
    }
}

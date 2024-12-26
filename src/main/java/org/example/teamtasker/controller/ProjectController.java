package org.example.teamtasker.controller;

import org.example.teamtasker.entity.Project;
import org.example.teamtasker.service.Imp.ProjectServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/team-tasker/projects")
public class ProjectController {
    private final ProjectServiceImp projectService;

    @Autowired
    public ProjectController(ProjectServiceImp projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProject(@RequestParam String userId) {
        return projectService.getProjectsByUserId(userId);
    }
}
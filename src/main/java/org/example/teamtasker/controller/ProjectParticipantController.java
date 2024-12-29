package org.example.teamtasker.controller;

import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.service.Imp.ProjectParticipantServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/team-tasker/project-participants")
public class ProjectParticipantController {
    private final ProjectParticipantServiceImp projectParticipantService;

    @Autowired
    public ProjectParticipantController(ProjectParticipantServiceImp projectParticipantService) {
        this.projectParticipantService = projectParticipantService;
    }

    @GetMapping("/{projectId}")
    public List<ProjectParticipantDTO> getAllParticipants(@PathVariable String projectId) {
        return projectParticipantService.getParticipants(projectId);
    }

}

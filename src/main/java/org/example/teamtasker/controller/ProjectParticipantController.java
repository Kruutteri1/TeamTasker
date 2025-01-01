package org.example.teamtasker.controller;

import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.entity.ProjectParticipant;
import org.example.teamtasker.service.Impl.ProjectParticipantServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team-tasker/project-participants")
public class ProjectParticipantController {
    private final ProjectParticipantServiceImpl projectParticipantService;

    @Autowired
    public ProjectParticipantController(ProjectParticipantServiceImpl projectParticipantService) {
        this.projectParticipantService = projectParticipantService;
    }

    @GetMapping("/{projectId}")
    public List<ProjectParticipantDTO> getAllParticipants(@PathVariable String projectId) {
        return projectParticipantService.getParticipants(projectId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addParticipantToProject(@RequestParam String projectId,
                                                     @RequestParam String email) {
        return projectParticipantService.addParticipantToProject(projectId, email);
    }

    @PutMapping("/update-role/{participantId}")
    public ProjectParticipant updateParticipantRole(@PathVariable String participantId,
                                                    @RequestParam String role) {
        return projectParticipantService.updateParticipantRole(participantId, role);
    }

    @DeleteMapping("/delete/{participantId}")
    public ResponseEntity<?> deleteParticipant(@PathVariable String participantId) {
        return projectParticipantService.deleteParticipant(participantId);
    }

}

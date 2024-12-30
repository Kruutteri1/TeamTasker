package org.example.teamtasker.controller;

import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.entity.ProjectParticipant;
import org.example.teamtasker.service.Imp.ProjectParticipantServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PutMapping("/update-role/{participantId}")
    public ProjectParticipant updateParticipantRole(@PathVariable String participantId,
                                                    @RequestBody Map<String, String> requestBody) {
        String role = requestBody.get("role");
        return projectParticipantService.updateParticipantRole(participantId, role);
    }

    @DeleteMapping("/delete/{participantId}")
    public ResponseEntity<String> deleteParticipant(@PathVariable String participantId) {
        return projectParticipantService.deleteParticipant(participantId);
    }

}

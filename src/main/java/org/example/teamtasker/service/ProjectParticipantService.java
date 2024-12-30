package org.example.teamtasker.service;


import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.entity.ProjectParticipant;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProjectParticipantService {

    List<ProjectParticipantDTO> getParticipants(String projectId);

    ProjectParticipant updateParticipantRole(String participantId, String role);

    ResponseEntity<String> deleteParticipant(String participantId);
}

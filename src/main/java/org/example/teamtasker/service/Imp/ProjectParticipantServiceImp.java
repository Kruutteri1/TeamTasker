package org.example.teamtasker.service.Imp;

import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.entity.ProjectParticipant;
import org.example.teamtasker.entity.ProjectRole;
import org.example.teamtasker.repository.ProjectParticipantRepository;
import org.example.teamtasker.service.ProjectParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectParticipantServiceImp implements ProjectParticipantService {
    private final ProjectParticipantRepository participantRepository;

    @Autowired
    public ProjectParticipantServiceImp(ProjectParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    @Override
    public List<ProjectParticipantDTO> getParticipants(String projectId) {
        return participantRepository.findParticipantsWithNamesByProjectId(projectId);
    }

    @Override
    public ProjectParticipant updateParticipantRole(String participantId, String role) {
        ProjectParticipant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant not found"));

        participant.setRole(ProjectRole.valueOf(role));

        return participantRepository.save(participant);
    }

    @Override
    public ResponseEntity<String> deleteParticipant(String participantId) {
        Optional<ProjectParticipant> participant = participantRepository.findById(participantId);

        if (participant.isPresent()) {
            participantRepository.deleteById(participantId);
            return new ResponseEntity<>("Participant with ID: " + participantId + " has been deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Participant with ID: " + participantId + " not found", HttpStatus.NOT_FOUND);
        }
    }
}

package org.example.teamtasker.service.Impl;

import org.bson.types.ObjectId;
import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.entity.ProjectParticipant;
import org.example.teamtasker.entity.ProjectRole;
import org.example.teamtasker.entity.User;
import org.example.teamtasker.repository.ProjectParticipantRepository;
import org.example.teamtasker.repository.UserRepository;
import org.example.teamtasker.service.ProjectParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectParticipantServiceImpl implements ProjectParticipantService {
    private final ProjectParticipantRepository participantRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectParticipantServiceImpl(ProjectParticipantRepository participantRepository, UserRepository userRepository) {
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ProjectParticipantDTO> getParticipants(String projectId) {
        return participantRepository.findParticipantsWithNamesByProjectId(projectId);
    }

    @Override
    public ResponseEntity<?> addParticipantToProject(String projectId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email: " + email + " not found.");
        }

        User user = optionalUser.get();
        ObjectId objectUserId = new ObjectId(user.getId());

        if (participantRepository.findByUserIdAndProjectId(objectUserId, projectId).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email " + email + " is already a participant in this project.");
        }

        ProjectParticipant participant = new ProjectParticipant();
        participant.setProjectId(projectId);
        participant.setUserId(objectUserId);
        participant.setRole(ProjectRole.VIEWER);
        participantRepository.save(participant);

        return ResponseEntity.status(HttpStatus.OK).body("Participant successfully added.");
    }

    @Override
    public ProjectParticipant updateParticipantRole(String participantId, String role) {
        ProjectParticipant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant not found."));

        participant.setRole(ProjectRole.valueOf(role));

        return participantRepository.save(participant);
    }

    @Override
    public ResponseEntity<?> deleteParticipant(String participantId) {
        Optional<ProjectParticipant> participant = participantRepository.findById(participantId);

        if (participant.isPresent()) {
            participantRepository.deleteById(participantId);
            return new ResponseEntity<>("Participant with ID: " + participantId + " has been deleted.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Participant with ID: " + participantId + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}

package org.example.teamtasker.service.Imp;

import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.repository.ProjectParticipantRepository;
import org.example.teamtasker.service.ProjectParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectParticipantServiceImp implements ProjectParticipantService {
    private final ProjectParticipantRepository participantRepository;

    @Autowired
    public ProjectParticipantServiceImp(ProjectParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public List<ProjectParticipantDTO> getParticipants(String projectId) {
        return participantRepository.findParticipantsWithNamesByProjectId(projectId);
    }
}

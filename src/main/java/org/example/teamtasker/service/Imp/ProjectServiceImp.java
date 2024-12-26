package org.example.teamtasker.service.Imp;

import org.example.teamtasker.entity.Project;
import org.example.teamtasker.entity.ProjectParticipant;
import org.example.teamtasker.repository.ProjectParticipantRepository;
import org.example.teamtasker.repository.ProjectRepository;
import org.example.teamtasker.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImp implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectParticipantRepository participantRepository;

    @Autowired
    public ProjectServiceImp(ProjectRepository projectRepository, ProjectParticipantRepository participantRepository) {
        this.projectRepository = projectRepository;
        this.participantRepository = participantRepository;
    }

    @Override
    public List<Project> getProjectsByUserId(String userId) {
        List<ProjectParticipant> participants = participantRepository.findByUserId(userId);

        List<String> projectIds = participants.stream()
                .map(ProjectParticipant::getProjectId)
                .collect(Collectors.toList());

        return projectRepository.findByIdIn(projectIds);
    }
}

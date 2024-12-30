package org.example.teamtasker.service.Imp;

import org.bson.types.ObjectId;
import org.example.teamtasker.entity.Project;
import org.example.teamtasker.entity.ProjectParticipant;
import org.example.teamtasker.entity.User;
import org.example.teamtasker.repository.ProjectParticipantRepository;
import org.example.teamtasker.repository.ProjectRepository;
import org.example.teamtasker.repository.UserRepository;
import org.example.teamtasker.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.example.teamtasker.entity.ProjectRole.OWNER;

@Service
public class ProjectServiceImp implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectParticipantRepository participantRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectServiceImp(ProjectRepository projectRepository, ProjectParticipantRepository participantRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Project> getAllProjectsByUserId(String userId) {
        ObjectId objectId = new ObjectId(userId);

        List<ProjectParticipant> participants = participantRepository.findByUserId(objectId);

        List<String> projectIds = participants.stream()
                .map(ProjectParticipant::getProjectId)
                .collect(Collectors.toList());

        return projectRepository.findByIdIn(projectIds);
    }

    public Project getProjectDetailsByProjectId(String projectId) {
        return projectRepository.findProjectById(projectId);
    }

    @Override
    public ResponseEntity<String> createNewProject(String projectName, String description, String userId) {
        Project newProject = new Project();
        newProject.setName(projectName);
        newProject.setDescription(description);

        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            newProject.setOwnerUserName(user.getAuthorName());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Project savedProject = projectRepository.save(newProject);

        String projectId  = savedProject.getId();
        ProjectParticipant newProjectParticipant = new ProjectParticipant();

        newProjectParticipant.setProjectId(projectId);
        ObjectId objectUserId = new ObjectId(userId);
        newProjectParticipant.setUserId(objectUserId);
        newProjectParticipant.setRole(OWNER);
        participantRepository.save(newProjectParticipant);

        return ResponseEntity.status(HttpStatus.CREATED).body("Project created successfully with ID: " + projectId);
    }
}

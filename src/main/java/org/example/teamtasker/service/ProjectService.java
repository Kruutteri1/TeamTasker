package org.example.teamtasker.service;

import org.example.teamtasker.entity.Project;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProjectService {

    List<Project> getAllProjectsByUserId(String userId);

    ResponseEntity<String> createNewProject(String projectName, String description, String userId);
}

package org.example.teamtasker.service;

import org.example.teamtasker.entity.Project;

import java.util.List;

public interface ProjectService {

    List<Project> getAllProjectsByUserId(String userId);

    Project createNewProject(String projectName, String description, String userId);
}

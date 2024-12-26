package org.example.teamtasker.service;

import org.example.teamtasker.entity.Project;

import java.util.List;

public interface ProjectService {

    List<Project> getProjectsByUserId(String userId);
}

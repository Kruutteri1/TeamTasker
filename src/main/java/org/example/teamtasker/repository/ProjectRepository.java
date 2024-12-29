package org.example.teamtasker.repository;

import org.example.teamtasker.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByIdIn(List<String> projectIds);

    Project findProjectById(String projectId);
}

package org.example.teamtasker.repository;

import org.example.teamtasker.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByIdIn(List<String> projectIds);

    Project findProjectById(String projectId);
}

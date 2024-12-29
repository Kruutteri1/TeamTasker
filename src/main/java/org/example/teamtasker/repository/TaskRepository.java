package org.example.teamtasker.repository;

import org.example.teamtasker.entity.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByProjectId(String projectId);

    Optional<Task> findTaskById(String taskId);

    List<Task> findByStatus(String status);

    void deleteTaskById(String taskId);

}

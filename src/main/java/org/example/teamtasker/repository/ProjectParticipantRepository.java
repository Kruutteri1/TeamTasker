package org.example.teamtasker.repository;

import org.example.teamtasker.entity.ProjectParticipant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectParticipantRepository extends MongoRepository<ProjectParticipant, String> {
    List<ProjectParticipant> findByUserId(String userId);

}

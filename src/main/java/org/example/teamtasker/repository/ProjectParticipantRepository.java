package org.example.teamtasker.repository;

import org.bson.types.ObjectId;
import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.entity.ProjectParticipant;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectParticipantRepository extends MongoRepository<ProjectParticipant, String> {
    List<ProjectParticipant> findByUserId(ObjectId userId);

    @Aggregation(pipeline = {
            "{ \"$match\": { \"projectId\": \"?0\" } }",
            "{ \"$lookup\": { \"from\": \"users\", \"localField\": \"userId\", \"foreignField\": \"_id\", \"as\": \"userDetails\" } }",
            "{ \"$unwind\": \"$userDetails\" }",
            "{ \"$project\": { \"id\": \"$_id\", \"userName\": \"$userDetails.username\", \"role\": \"$role\" } }"
    })
    List<ProjectParticipantDTO> findParticipantsWithNamesByProjectId(String projectId);




}

package org.example.teamtasker.repository;

import io.micrometer.common.lang.NonNullApi;
import org.bson.types.ObjectId;
import org.example.teamtasker.dto.ProjectParticipantDTO;
import org.example.teamtasker.entity.ProjectParticipant;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@NonNullApi
public interface ProjectParticipantRepository extends MongoRepository<ProjectParticipant, String> {
    Optional<ProjectParticipant> findById(String id);

    Optional<ProjectParticipant> findByUserIdAndProjectId(ObjectId userId, String projectId);

    List<ProjectParticipant> findByUserId(ObjectId userId);

    @Aggregation(pipeline = {
            "{ \"$match\": { \"projectId\": \"?0\" } }",
            "{ \"$lookup\": { \"from\": \"users\", \"localField\": \"userId\", \"foreignField\": \"_id\", \"as\": \"userDetails\" } }",
            "{ \"$unwind\": \"$userDetails\" }",
            "{ \"$project\": { \"id\": \"$_id\", \"userName\": \"$userDetails.username\", \"role\": \"$role\" } }"
    })
    List<ProjectParticipantDTO> findParticipantsWithNamesByProjectId(String projectId);

    void deleteById(String id);
}

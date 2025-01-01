package org.example.teamtasker.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "project_participants")
public class ProjectParticipant {
    @Id
    private ObjectId id;

    private String projectId;
    private ObjectId userId;
    private ProjectRole role;
}

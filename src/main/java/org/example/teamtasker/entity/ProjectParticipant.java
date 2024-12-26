package org.example.teamtasker.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "project_participants")
public class ProjectParticipant {
    @Id
    private String id;

    private String projectId;
    private String userId;
    private ProjectRole role;
}

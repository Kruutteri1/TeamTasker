package org.example.teamtasker.dto;

import lombok.Data;

@Data
public class ProjectParticipantDTO {
    private String id;
    private String userName;
    private String role;

    public ProjectParticipantDTO(String userName, String role) {
        this.userName = userName;
        this.role = role;
    }
}

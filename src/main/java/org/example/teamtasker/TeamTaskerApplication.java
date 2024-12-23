package org.example.teamtasker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class TeamTaskerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamTaskerApplication.class, args);
    }

}
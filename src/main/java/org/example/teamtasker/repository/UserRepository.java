package org.example.teamtasker.repository;

import io.micrometer.common.lang.NonNullApi;
import org.example.teamtasker.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

@NonNullApi
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    Optional<User> findById(String userId);
}

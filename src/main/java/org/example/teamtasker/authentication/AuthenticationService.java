package org.example.teamtasker.authentication;

import lombok.RequiredArgsConstructor;
import org.example.teamtasker.config.JwtService;
import org.example.teamtasker.entity.Role;
import org.example.teamtasker.entity.User;
import org.example.teamtasker.execption.EmailAlreadyUsedException;
import org.example.teamtasker.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException("Email is already used");
        }

        var user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();
        repository.save(user);

        var jwtToken = jwtService.generateToken(user.getId(), user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(RuntimeException::new);
        var jwtToken = jwtService.generateToken(user.getId(), user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}

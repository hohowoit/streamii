package com.hohowoit.streamii_backend.service;

import com.hohowoit.streamii_backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.hohowoit.streamii_backend.model.User;
import com.hohowoit.streamii_backend.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "Email already in use!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");

        // 회원 정보 저장
        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getEmail());
        return "User registered successfully! JWT: " + token;
    }
}

package com.hohowoit.streamii_backend.service;

import com.hohowoit.streamii_backend.model.User;
import com.hohowoit.streamii_backend.repository.UserRepository;
import com.hohowoit.streamii_backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String login(User requestUser) {
        Optional<User> userOptional = userRepository.findByEmail(requestUser.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 암호화된 비밀번호 비교
            if (passwordEncoder.matches(requestUser.getPassword(), user.getPassword())) {
                return jwtTokenProvider.generateToken(user.getUsername());
            }
        }
        return "Invalid email or password";
    }
}

package com.hohowoit.streamii_backend.controller;

import com.hohowoit.streamii_backend.model.User;
import com.hohowoit.streamii_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return authService.login(user);
    }
}

package com.hohowoit.streamii_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/test")
public class testController {
    @GetMapping("user")
    public Map<String, String> getUser() {
        Map<String, String> response = new HashMap<>();
        response.put("name", "유빈");
        response.put("email", "hong@example.com");
        return response;
    }
}

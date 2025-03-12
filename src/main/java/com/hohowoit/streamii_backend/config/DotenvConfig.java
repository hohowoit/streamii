package com.hohowoit.streamii_backend.config;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    @PostConstruct
    public void init() {
        Dotenv dotenv = Dotenv.load();
        // JWT_SECRET 값을 시스템 속성으로 설정
        String jwtSecret = dotenv.get("JWT_SECRET");
        System.setProperty("JWT_SECRET", jwtSecret);  // 시스템 속성으로 설정
    }
}
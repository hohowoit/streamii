package com.hohowoit.streamii_backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long expirationTime;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey,
                            @Value("${jwt.expiration}") long expirationTime) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.expirationTime = expirationTime;
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromToken(String token) {
        JwtParser parser = Jwts.parser()  // parserBuilder 사용
                .setSigningKey(key)  // 서명 키 설정
                .build();  // JwtParser 빌드
        return parser.parseClaimsJws(token)
                .getBody()
                .getSubject();  // JWT 서브젝트(이메일) 반환
    }

    public boolean validateToken(String token) {
        try {
            JwtParser parser = Jwts.parser()  // parserBuilder 사용
                    .setSigningKey(key)  // 서명 키 설정
                    .build();  // JwtParser 빌드
            parser.parseClaimsJws(token);  // JWT 파싱
            return true;  // 유효한 토큰
        } catch (JwtException | IllegalArgumentException e) {
            // 토큰 유효성 검사 실패 시 예외 처리
            return false;  // 유효하지 않은 토큰
        }
    }
}

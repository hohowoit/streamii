package com.hohowoit.streamii_backend.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final UserDetails principal;
    private final Object credentials;

    public JwtAuthenticationToken(UserDetails principal, Object credentials) {
        super(principal.getAuthorities());
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(true); // 인증된 상태로 설정
    }

    @Override
    public Object getCredentials() {
        return credentials;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}


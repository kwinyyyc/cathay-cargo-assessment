package com.cathay.agentapi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Component
public class JwtCookieAuthenticationFilter extends OncePerRequestFilter {

    private final String jwtSecret;

    public JwtCookieAuthenticationFilter(@Value("${agent.security.jwt-secret}") String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("agent_jwt".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    try {
                        Claims claims = Jwts.parserBuilder()
                                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)))
                                .build()
                                .parseClaimsJws(token)
                                .getBody();

                        String subject = claims.getSubject();
                        String scope = claims.get("scope", String.class);

                        if (scope != null && scope.contains("read-agent")) {
                            Authentication auth = new UsernamePasswordAuthenticationToken(
                                    subject,
                                    null,
                                    Collections.singletonList(new SimpleGrantedAuthority("SCOPE_read-agent"))
                            );
                            SecurityContextHolder.getContext().setAuthentication(auth);
                        }
                    } catch (Exception ignored) {
                    }
                    break;
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}



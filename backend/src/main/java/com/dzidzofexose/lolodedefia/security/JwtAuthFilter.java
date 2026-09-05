package com.dzidzofexose.lolodedefia.security;

import com.dzidzofexose.lolodedefia.entity.User;
import com.dzidzofexose.lolodedefia.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                     @NonNull HttpServletResponse response,
                                     @NonNull FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (jwtUtil.isValid(token)) {
                String phone = jwtUtil.getPhone(token);
                User user = userRepository.findByPhone(phone).orElse(null);
                if (user != null) {
                    var auth = new UsernamePasswordAuthenticationToken(
                            user, null, List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole())));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}

package com.dzidzofexose.lolodedefia.controller;

import com.dzidzofexose.lolodedefia.dto.AuthResponse;
import com.dzidzofexose.lolodedefia.dto.LoginRequest;
import com.dzidzofexose.lolodedefia.dto.RegisterRequest;
import com.dzidzofexose.lolodedefia.entity.Role;
import com.dzidzofexose.lolodedefia.entity.User;
import com.dzidzofexose.lolodedefia.repository.UserRepository;
import com.dzidzofexose.lolodedefia.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (userRepository.existsByPhone(req.getPhone())) {
            return ResponseEntity.badRequest().body("Ce numéro est déjà utilisé.");
        }

        User user = new User();
        user.setName(req.getName());
        user.setPhone(req.getPhone());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.valueOf(req.getRole().toUpperCase()));
        user.setZone(req.getZone());
        user.setSkills(req.getSkills());
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getPhone(), user.getId(), user.getRole().name());
        return ResponseEntity.ok(toAuthResponse(user, token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        User user = userRepository.findByPhone(req.getPhone()).orElse(null);
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Numéro ou mot de passe incorrect.");
        }
        String token = jwtUtil.generateToken(user.getPhone(), user.getId(), user.getRole().name());
        return ResponseEntity.ok(toAuthResponse(user, token));
    }

    private AuthResponse toAuthResponse(User user, String token) {
        return new AuthResponse(
                token, user.getId(), user.getName(), user.getPhone(),
                user.getRole().name(), user.getZone(), user.getSkills(),
                user.getRating(), user.getBadge()
        );
    }
}

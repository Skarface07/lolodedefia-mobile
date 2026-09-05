package com.dzidzofexose.lolodedefia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long userId;
    private String name;
    private String phone;
    private String role;
    private String zone;
    private String skills;
    private Double rating;
    private String badge;
}

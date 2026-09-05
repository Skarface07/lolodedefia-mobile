package com.dzidzofexose.lolodedefia.controller;

import com.dzidzofexose.lolodedefia.entity.Role;
import com.dzidzofexose.lolodedefia.entity.User;
import com.dzidzofexose.lolodedefia.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/youths")
    public List<User> youths() {
        return userRepository.findByRole(Role.YOUTH);
    }
}

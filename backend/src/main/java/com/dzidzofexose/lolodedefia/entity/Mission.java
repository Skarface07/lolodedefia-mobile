package com.dzidzofexose.lolodedefia.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "missions")
@Data
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String service;

    @Column(nullable = false)
    private String zone;

    private String date;
    private String scheduledDate;
    private String scheduledTime;

    private String budget;
    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String status = "proposée";

    @ManyToOne
    @JoinColumn(name = "family_id", nullable = false)
    private User family;

    @ManyToOne
    @JoinColumn(name = "youth_id")
    private User youth;

    private Boolean familyEvaluated = false;
    private Boolean youthEvaluated = false;

    private String checkIn;
    private String checkOut;

    private Integer paymentAmount;
    private String paymentMethod;
    private String paymentPhone;
    private String paidAt;

    private LocalDateTime createdAt = LocalDateTime.now();
}

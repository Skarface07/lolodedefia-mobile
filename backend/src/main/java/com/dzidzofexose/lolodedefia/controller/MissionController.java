package com.dzidzofexose.lolodedefia.controller;

import com.dzidzofexose.lolodedefia.entity.Mission;
import com.dzidzofexose.lolodedefia.entity.User;
import com.dzidzofexose.lolodedefia.repository.MissionRepository;
import com.dzidzofexose.lolodedefia.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final MissionRepository missionRepository;
    private final UserRepository userRepository;

    public MissionController(MissionRepository missionRepository, UserRepository userRepository) {
        this.missionRepository = missionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Mission> all() {
        return missionRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal User family, @RequestBody Mission body) {
        Mission m = new Mission();
        m.setService(body.getService());
        m.setZone(body.getZone());
        m.setDate(body.getDate());
        m.setScheduledDate(body.getScheduledDate());
        m.setScheduledTime(body.getScheduledTime());
        m.setBudget(body.getBudget());
        m.setDescription(body.getDescription());
        m.setFamily(family);
        missionRepository.save(m);
        return ResponseEntity.ok(m);
    }

    @PostMapping("/{id}/choose-youth")
    public ResponseEntity<?> chooseYouth(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        Mission m = missionRepository.findById(id).orElseThrow();
        User youth = userRepository.findById(body.get("youthId")).orElseThrow();
        m.setYouth(youth);
        m.setStatus("en attente de confirmation");
        missionRepository.save(m);
        return ResponseEntity.ok(m);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<?> pay(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Mission m = missionRepository.findById(id).orElseThrow();
        m.setPaymentAmount((Integer) body.get("amount"));
        m.setPaymentMethod((String) body.get("method"));
        m.setPaymentPhone((String) body.get("phone"));
        m.setPaidAt(java.time.LocalDateTime.now().toString());
        missionRepository.save(m);
        return ResponseEntity.ok(m);
    }

    @PostMapping("/{id}/respond")
    public ResponseEntity<?> respond(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        Mission m = missionRepository.findById(id).orElseThrow();
        m.setStatus(Boolean.TRUE.equals(body.get("accept")) ? "acceptée" : "refusée");
        missionRepository.save(m);
        return ResponseEntity.ok(m);
    }

    @PostMapping("/{id}/checkin")
    public ResponseEntity<?> checkIn(@PathVariable Long id) {
        Mission m = missionRepository.findById(id).orElseThrow();
        m.setStatus("en_cours");
        m.setCheckIn(java.time.LocalTime.now().toString());
        missionRepository.save(m);
        return ResponseEntity.ok(m);
    }

    @PostMapping("/{id}/checkout")
    public ResponseEntity<?> checkOut(@PathVariable Long id) {
        Mission m = missionRepository.findById(id).orElseThrow();
        m.setStatus("terminée");
        m.setCheckOut(java.time.LocalTime.now().toString());
        missionRepository.save(m);
        return ResponseEntity.ok(m);
    }

    @PostMapping("/{id}/evaluate")
    public ResponseEntity<?> evaluate(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Mission m = missionRepository.findById(id).orElseThrow();
        if ("family".equals(body.get("who"))) m.setFamilyEvaluated(true);
        else m.setYouthEvaluated(true);
        missionRepository.save(m);
        return ResponseEntity.ok(m);
    }
}

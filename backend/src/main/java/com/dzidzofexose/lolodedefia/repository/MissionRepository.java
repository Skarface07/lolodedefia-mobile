package com.dzidzofexose.lolodedefia.repository;

import com.dzidzofexose.lolodedefia.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MissionRepository extends JpaRepository<Mission, Long> {
    List<Mission> findByFamilyId(Long familyId);
    List<Mission> findByYouthId(Long youthId);
}

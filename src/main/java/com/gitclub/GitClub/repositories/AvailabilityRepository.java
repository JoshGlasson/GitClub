package com.gitclub.GitClub.repositories;


import com.gitclub.GitClub.model.Availability;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface AvailabilityRepository extends CrudRepository<Availability, Long> {
    List<Availability> findByFixtureid(Long fixtureid);
    List<Availability> findByFixtureidAndUserid(Long fixtureid, List<Long> userid);

    @Transactional
    List<Availability> deleteByFixtureid(Long fixtureid);
}

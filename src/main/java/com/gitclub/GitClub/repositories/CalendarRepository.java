package com.gitclub.GitClub.repositories;


import com.gitclub.GitClub.model.Calendar;
import com.gitclub.GitClub.model.Fixtures;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CalendarRepository extends CrudRepository<Calendar, Long> {
    List<Calendar> findByTeamid(Long teamid);

    @Transactional
    List<Calendar> deleteByFixtureid(Long fixtureid);

}

package com.gitclub.GitClub.repositories;


import com.gitclub.GitClub.model.Fixtures;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FixturesRepository extends CrudRepository<Fixtures, Long> {
    List<Fixtures> findByTeamid(Long teamid);
}

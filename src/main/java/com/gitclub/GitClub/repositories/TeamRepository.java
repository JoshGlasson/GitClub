package com.gitclub.GitClub.repositories;


import com.gitclub.GitClub.model.Manager;
import com.gitclub.GitClub.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {


}
package com.gitclub.GitClub.repositories;


import com.gitclub.GitClub.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmailIn(String email);
    List<User> findByTeamid(Long teamid);

}

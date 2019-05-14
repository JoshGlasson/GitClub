package com.gitclub.GitClub.repositories;


import com.gitclub.GitClub.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmailIn(String email);

}

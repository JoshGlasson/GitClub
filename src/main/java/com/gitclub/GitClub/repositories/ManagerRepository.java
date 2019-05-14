package com.gitclub.GitClub.repositories;


import com.gitclub.GitClub.model.Manager;
import org.springframework.data.repository.CrudRepository;

public interface ManagerRepository extends CrudRepository<Manager, Long> {
    Manager findByEmailIn(String email);

}

package com.gitclub.GitClub.model;

import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.persistence.*;

@Data
@Entity
@Table(name = "TEAM")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String teamname;

    private Team() {

    }

    public Team(String teamname) {
        this.teamname = teamname;
    }

    public Long getId() {
        return id;
    }
}


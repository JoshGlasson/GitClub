package com.gitclub.GitClub.model;

import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.persistence.*;

@Data
@Entity
@Table(name = "USERS")
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String position;
    private Long teamid;

    private Manager() {

    }

    public Manager(String name, String email, String password, String role, String position, Long teamid) {
        this.name = name;
        this.email = email;
        this.password = this.setPassword(password);
        this.role = role;
        this.position = position;
        this.teamid = teamid;
    }

    public String setPassword(String password) {
       return this.password = BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public String getEmail(){
        return this.email;
    }

    public String getPassword(){
        return this.password;
    }

    public void setTeamid(Long teamid) {
        this.teamid = teamid;
    }
}


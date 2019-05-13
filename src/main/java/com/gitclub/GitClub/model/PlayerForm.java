package com.gitclub.GitClub.model;

public class PlayerForm {

    private String name;
    private String email;
    private String password;
    private String role;
    private String position;
    private String teamid;

    public PlayerForm(String name, String email, String password, String role, String position, String teamid) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.position = position;
        this.teamid = teamid;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getTeamid() {
        return teamid;
    }

    public void setTeamid(String teamid) {
        this.teamid = teamid;
    }
}

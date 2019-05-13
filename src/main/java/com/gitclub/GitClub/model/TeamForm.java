package com.gitclub.GitClub.model;

public class TeamForm {

    private String teamname;

    public TeamForm(String teamname) {
        this.teamname = teamname;
    }

    public void setName(String name) {
        this.teamname = name;
    }

    public String getName() {
        return teamname;
    }


}

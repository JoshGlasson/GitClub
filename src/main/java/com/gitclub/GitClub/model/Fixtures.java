package com.gitclub.GitClub.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "FIXTURES")
public class Fixtures {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private String fixture;
    private String location;
    private String season;
    private String result;
    private String motm;
    private Long teamid;
    private String training;

    private Fixtures() {

    }


    public Fixtures(String date, String fixture, String location, String season, String training, Long teamid) {
        this.date = date;
        this.fixture = fixture;
        this.location = location;
        this.season = season;
        this.training = training;
        this.teamid = teamid;
    }


}


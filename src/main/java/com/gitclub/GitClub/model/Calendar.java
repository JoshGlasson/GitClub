package com.gitclub.GitClub.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "CALENDAR")
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String start;
    private String color;
    private Long teamid;
    private Long fixtureid;

    private Calendar() {

    }


    public Calendar(String start, String title, Long teamid, String color, Long fixtureid) {
        this.start = start;
        this.title = title;
        this.color = color;
        this.teamid = teamid;
        this.fixtureid = fixtureid;
    }


}

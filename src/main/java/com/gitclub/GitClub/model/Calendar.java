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
    private String time;
    private String title;
    private Long teamid;

    private Calendar() {

    }


    public Calendar(String time, String title, Long teamid) {
        this.time = time;
        this.title = title;
        this.teamid = teamid;
    }


}

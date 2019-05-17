package com.gitclub.GitClub.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "AVAILABILITY")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userid;
    private Long fixtureid;

    private Availability() {

    }


    public Availability(Long userid, Long fixtureid) {
        this.fixtureid = fixtureid;
        this.userid = userid;
    }


}

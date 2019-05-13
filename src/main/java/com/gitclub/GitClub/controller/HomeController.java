package com.gitclub.GitClub.controller;

import com.gitclub.GitClub.model.*;
import com.gitclub.GitClub.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;



@Controller
public class HomeController {

    private final ManagerRepository managerRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public HomeController(ManagerRepository managerRepository, TeamRepository teamRepository) {
        this.managerRepository = managerRepository;
        this.teamRepository = teamRepository;
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "user/new/manager")
    public String user(Model model) {
        model.addAttribute("manager", new ManagerForm("", "", "", "manager", ""));
        return "registerManager";
    }

    @PostMapping(value = "user/manager")
    public RedirectView manager(@ModelAttribute Manager manager) {
        return new RedirectView("/registerTeam");
    }

    @GetMapping(value = "/registerTeam")
    public String team(Model model) {
        model.addAttribute("team", new TeamForm(""));
        return "registerTeam";
    }

    @PostMapping(value = "/getRegisterTeam")
    public RedirectView team(@ModelAttribute Team team, Manager manager) {
        teamRepository.save(team);
        manager.setTeamid(team.getId());
        managerRepository.save(manager);
        return new RedirectView("/");
    }
}

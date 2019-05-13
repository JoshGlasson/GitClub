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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
public class HomeController {

    private final ManagerRepository managerRepository;
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public HomeController(ManagerRepository managerRepository, TeamRepository teamRepository, PlayerRepository playerRepository) {
        this.managerRepository = managerRepository;
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
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
    public RedirectView manager(@ModelAttribute Manager manager, HttpServletRequest request) {
        HttpSession session = request.getSession();
        Team team = (Team) session.getAttribute("teamname");

        manager.setTeamid(team.getId());
        managerRepository.save(manager);
        return new RedirectView("/");
    }

    @GetMapping(value = "/registerTeam")
    public String team(Model model) {
        model.addAttribute("team", new TeamForm(""));
        return "registerTeam";
    }

    @PostMapping(value = "/register/team")
    public RedirectView team(@ModelAttribute Team team, HttpServletRequest request) {
        teamRepository.save(team);
        HttpSession session = request.getSession();
        session.setAttribute("teamname", teamRepository.findByTeamnameIn(team.getTeamname()));
        return new RedirectView("/user/new/manager");
    }

    @GetMapping(value = "/registerPlayer")
    public String player(Model model) {
        model.addAttribute("player", new PlayerForm("", "", "", "player", "", ""));
        return "registerPlayer";
    }

    @PostMapping(value = "/register/player")
    public RedirectView player(@ModelAttribute Player player) {
        playerRepository.save(player);
        return new RedirectView("/");
    }
}

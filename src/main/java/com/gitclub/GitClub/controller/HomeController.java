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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
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

    @GetMapping(value = "/registerTeam")
    public String team(Model model) {
        model.addAttribute("team", new TeamForm(""));
        return "registerTeam";
    }

    @PostMapping(value = "/register/team")
    public RedirectView team(@ModelAttribute Team team, HttpServletRequest request, RedirectAttributes redirAttrs) {
        try {
            teamRepository.save(team);
            HttpSession session = request.getSession();
            session.setAttribute("teamname", teamRepository.findByTeamnameIn(team.getTeamname()));
            return new RedirectView("/registerManager");
        }
        catch (Exception e) {
            redirAttrs.addFlashAttribute("message", "Team Name Taken");
            return new RedirectView("/registerTeam");
        }
    }

    @GetMapping(value = "registerManager")
    public String user(Model model) {
        model.addAttribute("manager", new ManagerForm("", "", "", "manager", ""));
        return "registerManager";
    }

    @PostMapping(value = "register/manager")
    public RedirectView manager(@ModelAttribute Manager manager, HttpServletRequest request, RedirectAttributes redirAttrs) {
        try {
            HttpSession session = request.getSession();
            Team team = (Team) session.getAttribute("teamname");
            manager.setTeamid(team.getId());
            managerRepository.save(manager);
            return new RedirectView("/");
        } catch (Exception e) {
        redirAttrs.addFlashAttribute("message", "Email Address Already In Use");
        return new RedirectView("/registerManager");
    }
    }


    @GetMapping(value = "/registerPlayer")
    public String player(Model model) {
        model.addAttribute("player", new PlayerForm("", "", "", "player", "", ""));
        return "registerPlayer";
    }

    @PostMapping(value = "/register/player")
    public RedirectView player(@ModelAttribute Player player, RedirectAttributes redirAttrs){
        try {
            playerRepository.save(player);
            return new RedirectView("/");
        } catch (Exception e) {
            if(e.toString().contains("email")) {
                redirAttrs.addFlashAttribute("message", "Email Address Already In Use");
                return new RedirectView("/registerPlayer");
            } else {
                redirAttrs.addFlashAttribute("message", "Team Does Not Exist");
                return new RedirectView("/registerPlayer");
            }
        }
    }

    @GetMapping(value = "user/signin")
    public String signIn(Model model) {
        model.addAttribute("user", new SignInForm("email", "password"));
        return "signin";
    }

    @PostMapping(value = "user/authentication")
    public RedirectView signIn(@ModelAttribute SignInForm user, HttpServletRequest request) {
       // model.addAttribute("user", new SignInForm("",""));
        if (SignIn.checkPassword(user.getPassword(), managerRepository.findByEmailIn(user.getEmail()).getPassword())){
            HttpSession session = request.getSession();
            session.setAttribute("current user", managerRepository.findByEmailIn(user.getEmail()));
        }
        else if (SignIn.checkPassword(user.getPassword(), playerRepository.findByEmailIn(user.getEmail()).getPassword())){
            HttpSession session = request.getSession();
            session.setAttribute("current user", playerRepository.findByEmailIn(user.getEmail()));
        }
        else
        {
            System.out.println("does not match");
        }
        return new RedirectView("/");
    }
}

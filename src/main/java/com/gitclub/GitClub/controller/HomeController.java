package com.gitclub.GitClub.controller;

import com.gitclub.GitClub.model.*;
import com.gitclub.GitClub.repositories.TeamRepository;
import com.gitclub.GitClub.repositories.UserRepository;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
public class HomeController {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public HomeController(UserRepository userRepository, TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/")
    public ModelAndView index(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("current user") != null) {
            return new ModelAndView(new RedirectView("/landingpage"));
        }
        return new ModelAndView("index");
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
        } catch (Exception e) {
            redirAttrs.addFlashAttribute("message", "Team Name Taken");
            return new RedirectView("/registerTeam");
        }
    }

    @GetMapping(value = "registerManager")
    public String user(Model model) {
        model.addAttribute("manager", new UserForm("", "", "", "manager", "", ""));
        return "registerManager";
    }

    @PostMapping(value = "register/manager")
    public RedirectView manager(@ModelAttribute User user, HttpServletRequest request, RedirectAttributes redirAttrs) {
        try {
            HttpSession session = request.getSession();
            Team team = (Team) session.getAttribute("teamname");
            user.setTeamid(team.getId());
            userRepository.save(user);
            return new RedirectView("/");
        } catch (Exception e) {
            redirAttrs.addFlashAttribute("message", "Email Address Already In Use");
            return new RedirectView("/registerManager");
        }
    }


    @GetMapping(value = "/registerPlayer")
    public String player(Model model) {
        model.addAttribute("player", new UserForm("", "", "", "player", "", ""));
        return "registerPlayer";
    }

    @PostMapping(value = "/register/player")
    public RedirectView player(@ModelAttribute User user, RedirectAttributes redirAttrs) {
        try {
            userRepository.save(user);
            return new RedirectView("/");
        } catch (DataIntegrityViolationException e) {
            if (e.toString().contains("email")) {
                redirAttrs.addFlashAttribute("message", "Email Address Already In Use");
                return new RedirectView("/registerPlayer");
            } else {
                redirAttrs.addFlashAttribute("message", "Team Does Not Exist");
                return new RedirectView("/registerPlayer");
            }
        } catch (TypeMismatchException e) {
            redirAttrs.addFlashAttribute("message", "Please Enter Team ID Number");
            return new RedirectView("/registerPlayer");
        }
    }

    @GetMapping(value = "user/signin")
    public String signIn(Model model) {
        model.addAttribute("user", new SignInForm("email", "password"));
        return "signin";
    }

    @PostMapping(value = "user/authentication")
    public RedirectView signIn(@ModelAttribute SignInForm user, HttpServletRequest request, RedirectAttributes redirAttrs) {
        try {
            if (SignIn.checkPassword(user.getPassword(), userRepository.findByEmailIn(user.getEmail()).getPassword())) {
                HttpSession session = request.getSession();
                session.setAttribute("current user", userRepository.findByEmailIn(user.getEmail()));
                System.out.println("Signed in");
                redirAttrs.addFlashAttribute("message", "Incorrect Login Details");
                return new RedirectView("/landingpage");
            } else {
                redirAttrs.addFlashAttribute("message", "Incorrect Password");
                return new RedirectView("/");
            }
        } catch (Exception e) {
            redirAttrs.addFlashAttribute("message", "Incorrect Email Address");
            return new RedirectView("/");
        }
    }

    @GetMapping(value = "/landingpage")
    public ModelAndView landing(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if (session.getAttribute("current user") != null) {
            User user = (User) session.getAttribute("current user");
            model.addAttribute("role", user.getRole());
            model.addAttribute("teamid", user.getTeamid());
            model.addAttribute("current_user", user.getId());
            return new ModelAndView("landingPage");
        } else {
            return new ModelAndView(new RedirectView("/"));
        }
    }


    @GetMapping(value = "/addFixtures")
    public ModelAndView addFixtures(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if (session.getAttribute("current user") != null) {
            User user = (User) session.getAttribute("current user");
            model.addAttribute("role", user.getRole());
            model.addAttribute("teamid", user.getTeamid());
            return new ModelAndView("addFixtures");
        } else {
            return new ModelAndView(new RedirectView("/"));
        }
    }

    @GetMapping(value = "/viewResults")
    public ModelAndView viewResults(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if (session.getAttribute("current user") != null) {
            User user = (User) session.getAttribute("current user");
            model.addAttribute("role", user.getRole());
            model.addAttribute("teamid", user.getTeamid());
            return new ModelAndView("viewResults");
        } else {
            return new ModelAndView(new RedirectView("/"));
        }
    }

    @GetMapping(value = "/viewTeam")
    public ModelAndView viewTeam(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if (session.getAttribute("current user")!=null) {
            User user = (User) session.getAttribute("current user");
            model.addAttribute("role", user.getRole());
            model.addAttribute("teamid", user.getTeamid());
            return new ModelAndView( "viewTeam");
        } else {
            return new ModelAndView(new RedirectView("/"));
        }
    }

    @GetMapping(value = "user/signout")
    public RedirectView signOut(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute("current user", null);
        session.setAttribute("role", null);
        session.setAttribute("teamname", null);
        return new RedirectView("/");
    }

    @GetMapping(value = "/viewFixtures")
    public ModelAndView calendar(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if (session.getAttribute("current user")!=null) {
            User user = (User) session.getAttribute("current user");
            model.addAttribute("role", user.getRole());
            model.addAttribute("teamid", user.getTeamid());
            return new ModelAndView( "viewFixtures");
        } else {
            return new ModelAndView(new RedirectView("/"));
        }
    }

    @GetMapping(value = "/availability")
    public ModelAndView availability(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if (session.getAttribute("current user") != null) {
            User user = (User) session.getAttribute("current user");
            model.addAttribute("role", user.getRole());
            model.addAttribute("teamid", user.getTeamid());
            return new ModelAndView("availability");
        } else {
            return new ModelAndView(new RedirectView("/"));
        }
    }
}

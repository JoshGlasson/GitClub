package com.gitclub.GitClub.controller;

import com.gitclub.GitClub.model.*;
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

    @Autowired
    public HomeController() {

    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "user/new/manager")
    public String user(Model model) {
        model.addAttribute("user", new ManagerForm("", "", "", "manager", ""));
        return "register_manager";
    }

    @PostMapping(value = "manager/manager")
    public RedirectView user(@ModelAttribute Manager manager) {
//        userRepository.save(manager);
        return new RedirectView("/");
    }
}

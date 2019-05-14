package com.gitclub.GitClub.model;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class SignIn {
    public static boolean checkPassword(String password, String stored_hash){
        return  BCrypt.checkpw(password, stored_hash);
    }
}

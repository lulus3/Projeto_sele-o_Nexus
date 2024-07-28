package br.com.taskmaster.usuarios.dto;

import lombok.Getter;

@Getter
public class TokenRequest {
    private String token;

    public void setToken(String token) {
        this.token = token;
    }
}
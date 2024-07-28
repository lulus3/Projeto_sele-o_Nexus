package br.com.taskmaster.usuarios.security;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthenticationResponse {
    private String jwt;
    private Long id;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String jwt, Long id) {
        this.jwt = jwt;
        this.id = id;
    }

}

package br.com.taskmaster.usuarios.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UsuarioDto {
    private Long id;
    private String email;
    private String nome;
    private String senha;
}

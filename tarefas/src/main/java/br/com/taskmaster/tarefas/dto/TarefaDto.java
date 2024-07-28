package br.com.taskmaster.tarefas.dto;

import br.com.taskmaster.tarefas.model.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TarefaDto {
    private Long id;
    private String titulo;
    private LocalDateTime data;
    private Status status;
    private String descricao;
    private long perfilId;
}

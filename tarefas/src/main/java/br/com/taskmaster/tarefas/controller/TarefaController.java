package br.com.taskmaster.tarefas.controller;

import br.com.taskmaster.tarefas.dto.TarefaDto;
import br.com.taskmaster.tarefas.service.TarefaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "http://localhost:5173")
public class TarefaController {
    @Autowired
    private TarefaService service;

    @GetMapping
    public Page<TarefaDto> listar(@RequestParam Long perfilId, @PageableDefault(size = 10) Pageable paginacao) {
        return service.obterTodos(perfilId, paginacao);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaDto> detalhar(@PathVariable @NotNull Long id) {
        TarefaDto dto = service.obterPorId(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<TarefaDto> cadastrar(@RequestBody @Valid TarefaDto dto,
                                                  UriComponentsBuilder uriBuilder) {
        TarefaDto tarefa = service.criarTarefa(dto);
        URI endereco = uriBuilder.path("/pagamentos/{id}").buildAndExpand(tarefa.getId()).toUri();
        return ResponseEntity.created(endereco).body(tarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaDto> atualizar(@PathVariable @NotNull Long id,
                                                  @RequestBody @Valid TarefaDto dto) {
        TarefaDto atualizado = service.atualizartarefa(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TarefaDto> remover(@PathVariable @NotNull Long id) {
        service.excluirTarefa(id);
        return ResponseEntity.noContent().build();
    }
}

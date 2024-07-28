package br.com.taskmaster.tarefas.repository;

import br.com.taskmaster.tarefas.model.Tarefa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    Page<Tarefa> findByPerfilId(Long perfilId, Pageable paginacao);
}

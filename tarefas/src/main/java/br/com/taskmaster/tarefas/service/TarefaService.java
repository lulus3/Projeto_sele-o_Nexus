package br.com.taskmaster.tarefas.service;


import br.com.taskmaster.tarefas.dto.TarefaDto;
import br.com.taskmaster.tarefas.model.Tarefa;
import br.com.taskmaster.tarefas.repository.TarefaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TarefaService {
    @Autowired
    private TarefaRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    // Listar todas as tarefas usando Paginação e perfilId
    public Page<TarefaDto> obterTodos(Long perfilId, Pageable paginacao) {
        return repository.findByPerfilId(perfilId, paginacao)
                .map(tarefa -> modelMapper.map(tarefa, TarefaDto.class));
    }

    // Consultar uma tarefa por ID
    public TarefaDto obterPorId(Long id) {
        Tarefa tarefa = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException());

        return modelMapper.map(tarefa, TarefaDto.class);
    }

    // Cadastrar tarefa
    public TarefaDto criarTarefa(TarefaDto dto) {
        Tarefa tarefa = modelMapper.map(dto, Tarefa.class);
        repository.save(tarefa);
        return modelMapper.map(tarefa, TarefaDto.class);
    }

    // Alterar tarefa
    public TarefaDto atualizartarefa(Long id, TarefaDto dto) {
        Tarefa tarefa = modelMapper.map(dto, Tarefa.class);
        tarefa.setId(id);
        tarefa = repository.save(tarefa);
        return modelMapper.map(tarefa, TarefaDto.class);
    }


    // Excluir tarefa
    public void excluirTarefa(Long id) { repository.deleteById(id); }
}

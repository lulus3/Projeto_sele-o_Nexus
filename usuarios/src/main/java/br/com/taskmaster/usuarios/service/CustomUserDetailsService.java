package br.com.taskmaster.usuarios.service;

import br.com.taskmaster.usuarios.dto.UsuarioDto;
import br.com.taskmaster.usuarios.model.Usuario;
import br.com.taskmaster.usuarios.security.CustomUserDetails;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsuarioDto usuarioDto = usuarioService.findByEmail(email);
        Usuario usuario = modelMapper.map(usuarioDto, Usuario.class);
        return new CustomUserDetails(usuario);
    }
}

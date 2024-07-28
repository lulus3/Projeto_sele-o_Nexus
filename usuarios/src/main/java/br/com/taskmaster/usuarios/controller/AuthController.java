package br.com.taskmaster.usuarios.controller;

import br.com.taskmaster.usuarios.dto.TokenRequest;
import br.com.taskmaster.usuarios.dto.UsuarioDto;
import br.com.taskmaster.usuarios.security.AuthenticationRequest;
import br.com.taskmaster.usuarios.security.AuthenticationResponse;
import br.com.taskmaster.usuarios.security.CustomUserDetails;
import br.com.taskmaster.usuarios.service.CustomUserDetailsService;
import br.com.taskmaster.usuarios.service.JwtUtil;
import br.com.taskmaster.usuarios.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            // Criação do token de autenticação
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getSenha());

            // Chamada ao AuthenticationManager para autenticar o usuário
            authenticationManager.authenticate(authenticationToken);
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
            throw new Exception("Incorrect email or password", e);
        }
        // Carrega os detalhes do usuário
        final CustomUserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

        // Gera o token JWT
        final String jwt = jwtUtil.generateToken(userDetails);

        Long userId = jwtUtil.extractUserId(jwt);

        // Retorna o token na resposta
        return ResponseEntity.ok(new AuthenticationResponse(jwt, userId));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UsuarioDto usuario) {
        try {
            UsuarioDto savedUsuario = usuarioService.registrarUsuario(usuario);
            return ResponseEntity.ok(savedUsuario);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody TokenRequest tokenRequest) {
        String token = tokenRequest.getToken();
        try {
            token = token.replace("Bearer ", "");
            String username = jwtUtil.extractUsername(token);
            CustomUserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(token, userDetails)) {
                return ResponseEntity.ok(userDetails);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
            }
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }
    }
}
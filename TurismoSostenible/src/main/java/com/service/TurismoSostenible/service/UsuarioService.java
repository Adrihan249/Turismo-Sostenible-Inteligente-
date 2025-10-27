package com.service.TurismoSostenible.service;

import com.service.TurismoSostenible.model.Usuario;
import com.service.TurismoSostenible.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Usuario registrar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String password) {
        return usuarioRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElse(null);
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario actualizar(Long id, Usuario usuario) {
        Usuario existente = usuarioRepository.findById(id).orElseThrow();
        existente.setNombre(usuario.getNombre());
        existente.setEmail(usuario.getEmail());
        existente.setPassword(usuario.getPassword());
        existente.setRol(usuario.getRol());
        return usuarioRepository.save(existente);
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}

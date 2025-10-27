package com.service.TurismoSostenible.controller;

import com.service.TurismoSostenible.model.Usuario;
import com.service.TurismoSostenible.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    // 🔹 Registro específico (opcional)
    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        return ResponseEntity.status(201).body(usuarioService.registrar(usuario));
    }

    // 🔹 CRUD general
    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.listar();
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return usuarioService.registrar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
    }

    // 🔹 Login
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario datosLogin) {
        return usuarioService.login(datosLogin.getEmail(), datosLogin.getPassword());
    }
}

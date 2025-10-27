package com.service.TurismoSostenible.controller;

import com.service.TurismoSostenible.model.Paquete;
import com.service.TurismoSostenible.service.PaqueteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/paquetes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaqueteController {

    private final PaqueteService paqueteService;

    @GetMapping
    public List<Paquete> listar() {
        return paqueteService.listar();
    }

    // ✅ Obtener paquete por ID (para DetallePaquetePage)
    @GetMapping("/{id}")
    public ResponseEntity<Paquete> buscarPorId(@PathVariable Long id) {
        return paqueteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paquete crear(@RequestBody Paquete paquete) {
        // ✅ Si tiene detalle, establecer la relación bidireccional
        if (paquete.getDetalle() != null) {
            paquete.getDetalle().setPaquete(paquete);
        }
        return paqueteService.crear(paquete);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paquete> actualizar(@PathVariable Long id, @RequestBody Paquete paquete) {
        try {
            // ✅ Establecer relación si tiene detalle
            if (paquete.getDetalle() != null) {
                paquete.getDetalle().setPaquete(paquete);
            }
            Paquete actualizado = paqueteService.actualizar(id, paquete);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            paqueteService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
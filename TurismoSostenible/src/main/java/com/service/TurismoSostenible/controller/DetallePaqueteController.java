package com.service.TurismoSostenible.controller;

import com.service.TurismoSostenible.model.DetallePaquete;
import com.service.TurismoSostenible.service.DetallePaqueteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detalle_paquete")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DetallePaqueteController {

    private final DetallePaqueteService detalleService;

    @GetMapping
    public List<DetallePaquete> listar() {
        return detalleService.listar();
    }

    // ✅ Obtener detalle por ID de paquete
    @GetMapping("/paquete/{paqueteId}")
    public ResponseEntity<DetallePaquete> buscarPorPaqueteId(@PathVariable Long paqueteId) {
        return detalleService.buscarPorPaqueteId(paqueteId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetallePaquete> buscarPorId(@PathVariable Long id) {
        return detalleService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DetallePaquete crear(@RequestBody DetallePaquete detalle) {
        return detalleService.crear(detalle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetallePaquete> actualizar(@PathVariable Long id, @RequestBody DetallePaquete detalle) {
        try {
            DetallePaquete actualizado = detalleService.actualizar(id, detalle);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            detalleService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
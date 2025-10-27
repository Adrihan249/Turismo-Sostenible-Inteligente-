package com.service.TurismoSostenible.service;

import com.service.TurismoSostenible.model.Paquete;
import com.service.TurismoSostenible.repository.PaqueteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PaqueteService {

    private final PaqueteRepository paqueteRepository;

    @Transactional(readOnly = true)
    public List<Paquete> listar() {
        return paqueteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Paquete> buscarPorId(Long id) {
        return paqueteRepository.findById(id);
    }

    public Paquete crear(Paquete paquete) {
        return paqueteRepository.save(paquete);
    }

    public Paquete actualizar(Long id, Paquete paquete) {
        Paquete existente = paqueteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paquete no encontrado con id: " + id));

        existente.setNombre(paquete.getNombre());
        existente.setPrecio(paquete.getPrecio());
        existente.setRegion(paquete.getRegion());
        existente.setEtiqueta(paquete.getEtiqueta());
        existente.setImagenPrincipal(paquete.getImagenPrincipal());

        // ✅ Actualizar detalle si existe
        if (paquete.getDetalle() != null) {
            paquete.getDetalle().setPaquete(existente);
            existente.setDetalle(paquete.getDetalle());
        }

        return paqueteRepository.save(existente);
    }

    public void eliminar(Long id) {
        paqueteRepository.deleteById(id);
    }
}
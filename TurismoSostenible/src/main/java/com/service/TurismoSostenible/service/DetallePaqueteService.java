package com.service.TurismoSostenible.service;

import com.service.TurismoSostenible.model.DetallePaquete;
import com.service.TurismoSostenible.repository.DetallePaqueteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class DetallePaqueteService {

    private final DetallePaqueteRepository detalleRepository;

    @Transactional(readOnly = true)
    public List<DetallePaquete> listar() {
        return detalleRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<DetallePaquete> buscarPorId(Long id) {
        return detalleRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<DetallePaquete> buscarPorPaqueteId(Long paqueteId) {
        return detalleRepository.findByPaqueteId(paqueteId);
    }

    public DetallePaquete crear(DetallePaquete detalle) {
        return detalleRepository.save(detalle);
    }

    public DetallePaquete actualizar(Long id, DetallePaquete detalle) {
        DetallePaquete existente = detalleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle no encontrado con id: " + id));

        existente.setDescripcionDetallada(detalle.getDescripcionDetallada());
        existente.setIncluye(detalle.getIncluye());
        existente.setNoIncluye(detalle.getNoIncluye());
        existente.setImportante(detalle.getImportante());
        existente.setQueLlevar(detalle.getQueLlevar());
        existente.setVideoUrl(detalle.getVideoUrl());
        existente.setImagenSecundaria1(detalle.getImagenSecundaria1());
        existente.setImagenSecundaria2(detalle.getImagenSecundaria2());
        existente.setImagenSecundaria3(detalle.getImagenSecundaria3());

        return detalleRepository.save(existente);
    }

    public void eliminar(Long id) {
        detalleRepository.deleteById(id);
    }
}
package com.service.TurismoSostenible.repository;

import com.service.TurismoSostenible.model.DetallePaquete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DetallePaqueteRepository extends JpaRepository<DetallePaquete, Long> {
    Optional<DetallePaquete> findByPaqueteId(Long paqueteId);
}
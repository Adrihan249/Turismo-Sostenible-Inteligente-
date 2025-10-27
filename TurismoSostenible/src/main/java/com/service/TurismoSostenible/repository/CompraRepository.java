package com.service.TurismoSostenible.repository;
import com.service.TurismoSostenible.model.Compra;
import com.service.TurismoSostenible.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    List<Compra> findByUsuario(Usuario usuario);
}

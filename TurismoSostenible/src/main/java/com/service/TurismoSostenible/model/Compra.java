package com.service.TurismoSostenible.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "compras")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "paquete_id", nullable = false)
    private Paquete paquete;

    @NotNull(message = "Debe indicar la cantidad de personas")
    private Integer cantidadPersonas;

    private Double total;

    private LocalDateTime fecha = LocalDateTime.now();
}

// Paquete.java
package com.service.TurismoSostenible.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "paquetes")
public class Paquete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double precio;
    private String region;
    private String etiqueta;
    private String imagenPrincipal;

    // ✅ Relación OneToOne con DetallePaquete
    @OneToOne(mappedBy = "paquete", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Para evitar recursión infinita en JSON
    private DetallePaquete detalle;
}
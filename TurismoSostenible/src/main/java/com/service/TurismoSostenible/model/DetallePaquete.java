// DetallePaquete.java
package com.service.TurismoSostenible.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "detalle_paquetes")
public class DetallePaquete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String descripcionDetallada;

    @Column(length = 1000)
    private String incluye;

    @Column(length = 1000)
    private String noIncluye;

    @Column(length = 1000)
    private String importante;

    @Column(length = 1000)
    private String queLlevar;

    private String videoUrl;
    private String imagenSecundaria1;
    private String imagenSecundaria2;
    private String imagenSecundaria3;

    // ✅ Relación OneToOne con Paquete
    @OneToOne
    @JoinColumn(name = "paquete_id", referencedColumnName = "id")
    @JsonBackReference // Para evitar recursión infinita en JSON
    private Paquete paquete;
}
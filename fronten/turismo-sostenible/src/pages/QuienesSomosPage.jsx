import React, { useState } from "react";

const QuienesSomosPage = () => {
  const [tamanoTexto, setTamanoTexto] = useState(() => {
    return parseFloat(localStorage.getItem('tamanoTexto')) || 1;
  });
  const [altoContraste, setAltoContraste] = useState(() => {
    return localStorage.getItem('altoContraste') === 'true';
  });

  const anunciarCambio = (mensaje) => {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('role', 'status');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
    anuncio.textContent = mensaje;
    document.body.appendChild(anuncio);
    setTimeout(() => anuncio.remove(), 3000);
  };

  const cambiarTamanoTexto = (accion) => {
    let nuevoTamano = tamanoTexto;
    if (accion === 'aumentar' && tamanoTexto < 2) {
      nuevoTamano = tamanoTexto + 0.1;
    } else if (accion === 'disminuir' && tamanoTexto > 0.8) {
      nuevoTamano = tamanoTexto - 0.1;
    } else if (accion === 'reset') {
      nuevoTamano = 1;
    }
    setTamanoTexto(nuevoTamano);
    localStorage.setItem('tamanoTexto', nuevoTamano.toString());
    anunciarCambio(`Tamaño de texto ajustado al ${Math.round(nuevoTamano * 100)}%`);
  };

  const toggleAltoContraste = () => {
    const nuevoEstado = !altoContraste;
    setAltoContraste(nuevoEstado);
    localStorage.setItem('altoContraste', nuevoEstado.toString());
    anunciarCambio(nuevoEstado ? 'Modo alto contraste activado' : 'Modo alto contraste desactivado');
  };

  const testimonios = [
    {
      nombre: "Juan Martínez",
      cargo: "Cliente frecuente",
      texto: "Excelente servicio, tours organizados y guías profesionales. Volveré a viajar con Terranova.",
      imagen: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      nombre: "María Pérez",
      cargo: "Viajera frecuente",
      texto: "Precios justos, excelente atención y experiencias inolvidables. ¡100% recomendado!",
      imagen: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      nombre: "Carlos García",
      cargo: "Cliente satisfecho",
      texto: "Increíble experiencia en Cusco. Todo perfectamente organizado y lugares espectaculares.",
      imagen: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  const currentStyles = altoContraste ? stylesAltoContraste : styles;

  return (
    <div style={{...currentStyles.container, fontSize: `${tamanoTexto}rem`}}>
      {/* Toolbar de accesibilidad */}
      <div style={styles.a11yToolbar} role="toolbar" aria-label="Herramientas de accesibilidad">
        <button 
          onClick={() => cambiarTamanoTexto('disminuir')} 
          style={styles.a11yBtn}
          aria-label="Disminuir tamaño de texto"
        >
          A-
        </button>
        <button 
          onClick={() => cambiarTamanoTexto('reset')} 
          style={styles.a11yBtn}
          aria-label="Restablecer tamaño de texto"
        >
          A
        </button>
        <button 
          onClick={() => cambiarTamanoTexto('aumentar')} 
          style={styles.a11yBtn}
          aria-label="Aumentar tamaño de texto"
        >
          A+
        </button>
        <button 
          onClick={toggleAltoContraste} 
          style={styles.a11yBtn}
          aria-label={altoContraste ? "Desactivar alto contraste" : "Activar alto contraste"}
          aria-pressed={altoContraste}
        >
          ◐
        </button>
      </div>

      {/* Hero Section */}
      <section style={currentStyles.hero} role="banner">
        <div style={currentStyles.heroContent}>
          <h1 style={currentStyles.heroTitle}>
            ¿Quiénes Somos?
          </h1>
          <p style={currentStyles.heroSubtitle}>
            Conoce nuestro equipo y las experiencias que ofrecemos
          </p>
        </div>
      </section>

      <main style={currentStyles.main}>
        {/* Sección Quiénes Somos */}
        <section style={currentStyles.quienesSomosSection} aria-labelledby="quienes-somos-title">
          <div style={currentStyles.contentWrapper}>
            <div style={currentStyles.imageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" 
                alt="Equipo de Terranova Experience"
                style={currentStyles.teamImage}
              />
            </div>
            <div style={currentStyles.textContainer}>
              <h2 id="quienes-somos-title" style={currentStyles.sectionTitle}>
                ¿Quiénes Somos?
              </h2>
              <p style={currentStyles.paragraph}>
                Somos <strong>Terranova Experience</strong>, una agencia de viajes comprometida con brindarte las mejores experiencias turísticas en el Perú. Estamos ubicados en <strong>Lima, Perú</strong> y trabajamos para que tu viaje sea memorable.
              </p>
              <p style={currentStyles.paragraph}>
                Nuestro equipo está conformado por profesionales apasionados por el turismo. Nos esforzamos para que cada viaje sea una experiencia única, segura y llena de aventuras inolvidables.
              </p>
              <p style={currentStyles.paragraph}>
                Contamos con años de experiencia en el sector turístico, ofreciendo tours a los principales destinos del Perú: Cusco, Machu Picchu, Arequipa, Puno, la Amazonía y muchos más lugares increíbles.
              </p>
              <p style={currentStyles.paragraph}>
                Trabajamos con los mejores proveedores de servicios y guías turísticos certificados para garantizar tu seguridad y satisfacción en cada destino.
              </p>
            </div>
          </div>
        </section>

        {/* Sección Testimonios */}
        <section style={currentStyles.testimoniosSection} aria-labelledby="testimonios-title">
          <h2 id="testimonios-title" style={currentStyles.testimoniosTitle}>
            TESTIMONIOS REALES
          </h2>
          
          <div style={currentStyles.testimoniosGrid}>
            {testimonios.map((testimonio, index) => (
              <article 
                key={index} 
                style={currentStyles.testimonioCard}
                aria-labelledby={`testimonio-${index}`}
              >
                <div style={currentStyles.testimonioHeader}>
                  <img 
                    src={testimonio.imagen} 
                    alt={`Foto de ${testimonio.nombre}`}
                    style={currentStyles.testimonioAvatar}
                  />
                  <div>
                    <h3 id={`testimonio-${index}`} style={currentStyles.testimonioNombre}>
                      {testimonio.nombre}
                    </h3>
                    <p style={currentStyles.testimonioCargo}>{testimonio.cargo}</p>
                  </div>
                </div>
                <p style={currentStyles.testimonioTexto}>"{testimonio.texto}"</p>
                <div style={currentStyles.testimonioFooter}>
                  <button 
                    style={currentStyles.leerMasBtn}
                    aria-label={`Leer más sobre la experiencia de ${testimonio.nombre}`}
                  >
                    CONOCE MÁS →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  a11yToolbar: {
    background: '#f0f0f0',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    borderBottom: '2px solid #ddd',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  a11yBtn: {
    background: 'white',
    border: '2px solid #0066cc',
    color: '#0066cc',
    padding: '8px 16px',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    minWidth: '48px',
    minHeight: '48px',
  },
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  hero: {
    background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    position: "relative",
  },
  heroContent: {
    maxWidth: "800px",
    padding: "0 20px",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "15px",
    textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  quienesSomosSection: {
    background: "white",
    borderRadius: "15px",
    padding: "50px",
    marginBottom: "50px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  contentWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "40px",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  teamImage: {
    width: "100%",
    height: "auto",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  },
  textContainer: {
    paddingLeft: "20px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: "25px",
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "#333",
    marginBottom: "20px",
    textAlign: "justify",
  },
  testimoniosSection: {
    padding: "60px 0",
  },
  testimoniosTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#0066cc",
    marginBottom: "50px",
  },
  testimoniosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
  },
  testimonioCard: {
    background: "#1976d2",
    borderRadius: "15px",
    padding: "30px",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "transform 0.3s",
  },
  testimonioHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  testimonioAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "3px solid white",
  },
  testimonioNombre: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    margin: "0 0 5px 0",
  },
  testimonioCargo: {
    fontSize: "0.9rem",
    opacity: 0.9,
    margin: 0,
  },
  testimonioTexto: {
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  testimonioFooter: {
    textAlign: "center",
  },
  leerMasBtn: {
    background: "white",
    color: "#1976d2",
    border: "none",
    padding: "12px 30px",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "all 0.3s",
    minHeight: '48px',
  },
};

const stylesAltoContraste = {
  ...styles,
  container: {
    ...styles.container,
    background: "#000",
    color: "#ffff00",
  },
  hero: {
    ...styles.hero,
    background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29')",
  },
  heroTitle: {
    ...styles.heroTitle,
    color: "#ffff00",
  },
  heroSubtitle: {
    ...styles.heroSubtitle,
    color: "#ffff00",
  },
  quienesSomosSection: {
    ...styles.quienesSomosSection,
    background: "#000",
    border: "3px solid #ffff00",
  },
  sectionTitle: {
    ...styles.sectionTitle,
    color: "#ffff00",
  },
  paragraph: {
    ...styles.paragraph,
    color: "#ffff00",
  },
  testimoniosTitle: {
    ...styles.testimoniosTitle,
    color: "#ffff00",
  },
  testimonioCard: {
    ...styles.testimonioCard,
    background: "#000",
    border: "3px solid #ffff00",
    color: "#ffff00",
  },
  leerMasBtn: {
    ...styles.leerMasBtn,
    background: "#ffff00",
    color: "#000",
  },
};

export default QuienesSomosPage;
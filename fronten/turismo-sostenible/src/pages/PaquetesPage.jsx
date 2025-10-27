import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaquetesPage = () => {
  const navigate = useNavigate();
  const [paquetes, setPaquetes] = useState([]);
  const [paquetesFiltrados, setPaquetesFiltrados] = useState([]);
  const [filtro, setFiltro] = useState({ region: "", precio: "", etiqueta: "" });
  const [tamanoTexto, setTamanoTexto] = useState(() => {
    return parseFloat(localStorage.getItem('tamanoTexto')) || 1;
  });
  const [altoContraste, setAltoContraste] = useState(() => {
    return localStorage.getItem('altoContraste') === 'true';
  });

  useEffect(() => {
    document.documentElement.lang = 'es';
    cargarPaquetes();
  }, []);

  const cargarPaquetes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/paquetes");
      if (!response.ok) throw new Error('Error al cargar paquetes');
      const data = await response.json();
      setPaquetes(data);
      setPaquetesFiltrados(data);
    } catch (err) {
      console.error("Error al obtener paquetes:", err);
      mostrarError("No se pudieron cargar los paquetes. Por favor, intenta nuevamente.");
    }
  };

  const mostrarError = (mensaje) => {
    const alertaDiv = document.createElement('div');
    alertaDiv.setAttribute('role', 'alert');
    alertaDiv.setAttribute('aria-live', 'assertive');
    alertaDiv.textContent = mensaje;
    alertaDiv.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#f44336;color:white;padding:15px 30px;border-radius:8px;z-index:9999;';
    document.body.appendChild(alertaDiv);
    setTimeout(() => alertaDiv.remove(), 5000);
  };

  const handleBuscar = () => {
    const filtrados = paquetes.filter(p => {
      const cumpleRegion = filtro.region ? p.region.toLowerCase() === filtro.region.toLowerCase() : true;
      const cumpleEtiqueta = filtro.etiqueta ? p.etiqueta?.toLowerCase() === filtro.etiqueta.toLowerCase() : true;

      let cumplePrecio = true;
      if (filtro.precio) {
        const [min, max] = filtro.precio.split("-").map(Number);
        cumplePrecio = p.precio >= min && p.precio <= max;
      }

      return cumpleRegion && cumplePrecio && cumpleEtiqueta;
    });

    setPaquetesFiltrados(filtrados);
    
    const mensaje = filtrados.length > 0 
      ? `Se encontraron ${filtrados.length} paquetes que coinciden con tu búsqueda`
      : 'No se encontraron paquetes con esos criterios. Intenta modificar los filtros.';
    
    anunciarCambio(mensaje);
  };

  const anunciarCambio = (mensaje) => {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('role', 'status');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
    anuncio.textContent = mensaje;
    document.body.appendChild(anuncio);
    setTimeout(() => anuncio.remove(), 3000);
  };

  const verDetalle = (id, nombre) => {
    anunciarCambio(`Navegando a los detalles de ${nombre}`);
    navigate(`/paquete/${id}`);
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

  useEffect(() => {
    const cards = document.querySelectorAll(".package-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "all 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 100);
    });
  }, [paquetesFiltrados]);

  const getStyles = () => {
    const baseStyles = altoContraste ? stylesAltoContraste : styles;
    return {
      ...baseStyles,
      container: {
        ...baseStyles.container,
        fontSize: `${tamanoTexto}rem`,
      }
    };
  };

  const currentStyles = getStyles();

  return (
    <div style={currentStyles.container}>
      <div style={styles.a11yToolbar} role="toolbar" aria-label="Herramientas de accesibilidad">
        <button 
          onClick={() => cambiarTamanoTexto('disminuir')} 
          style={styles.a11yBtn}
          aria-label="Disminuir tamaño de texto"
          title="Disminuir tamaño de texto"
        >
          A-
        </button>
        <button 
          onClick={() => cambiarTamanoTexto('reset')} 
          style={styles.a11yBtn}
          aria-label="Restablecer tamaño de texto"
          title="Tamaño normal"
        >
          A
        </button>
        <button 
          onClick={() => cambiarTamanoTexto('aumentar')} 
          style={styles.a11yBtn}
          aria-label="Aumentar tamaño de texto"
          title="Aumentar tamaño de texto"
        >
          A+
        </button>
        <button 
          onClick={toggleAltoContraste} 
          style={styles.a11yBtn}
          aria-label={altoContraste ? "Desactivar alto contraste" : "Activar alto contraste"}
          aria-pressed={altoContraste}
          title="Alto contraste"
        >
          ◐
        </button>
      </div>

      <main style={currentStyles.main} role="main">
        <h1 style={currentStyles.title}>Paquetes y Full Days</h1>

        <section style={currentStyles.filtrosContainer} aria-label="Filtros de búsqueda">
          <div style={currentStyles.filtroItem}>
            <label htmlFor="filtro-region" style={currentStyles.label}>
              <span aria-hidden="true">📍</span> Región:
            </label>
            <select
              id="filtro-region"
              value={filtro.region}
              onChange={e => setFiltro({ ...filtro, region: e.target.value })}
              style={currentStyles.select}
              aria-label="Filtrar por región"
            >
              <option value="">Todas las regiones</option>
              <option value="costa">Costa</option>
              <option value="sierra">Sierra</option>
              <option value="selva">Selva</option>
            </select>
          </div>

          <div style={currentStyles.filtroItem}>
            <label htmlFor="filtro-precio" style={currentStyles.label}>
              <span aria-hidden="true">💰</span> Precio:
            </label>
            <select
              id="filtro-precio"
              value={filtro.precio}
              onChange={e => setFiltro({ ...filtro, precio: e.target.value })}
              style={currentStyles.select}
              aria-label="Filtrar por rango de precio"
            >
              <option value="">Todos los precios</option>
              <option value="50-70">S/ 50 - S/ 70</option>
              <option value="71-80">S/ 71 - S/ 80</option>
              <option value="81-90">S/ 81 - S/ 90</option>
              <option value="91-100">S/ 91 - S/ 100</option>
              <option value="101-120">S/ 101 - S/ 120</option>
            </select>
          </div>

          <div style={currentStyles.filtroItem}>
            <label htmlFor="filtro-etiqueta" style={currentStyles.label}>
              <span aria-hidden="true">🏷️</span> Etiqueta:
            </label>
            <select
              id="filtro-etiqueta"
              value={filtro.etiqueta}
              onChange={e => setFiltro({ ...filtro, etiqueta: e.target.value })}
              style={currentStyles.select}
              aria-label="Filtrar por etiqueta"
            >
              <option value="">Todas las etiquetas</option>
              <option value="Recomendado">Recomendado</option>
              <option value="Popular">Popular</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Oferta">Oferta</option>
            </select>
          </div>

          <button 
            onClick={handleBuscar} 
            style={currentStyles.buscarBtn}
            aria-label="Buscar paquetes con los filtros seleccionados"
          >
            <span aria-hidden="true">🔍</span> BUSCAR
          </button>
        </section>

        <div 
          style={currentStyles.paquetesGrid}
          role="list"
          aria-label={`Lista de paquetes turísticos. ${paquetesFiltrados.length} resultados`}
        >
          {paquetesFiltrados.map((p) => (
            <article
              key={p.id}
              className="package-card"
              style={currentStyles.card}
              role="listitem"
              aria-labelledby={`paquete-titulo-${p.id}`}
            >
              <div
                style={{
                  ...currentStyles.cardImage,
                  background: `url(${p.imagenPrincipal || "https://images.unsplash.com/photo-1501594907352-04cda38ebc29"}) center/cover`,
                }}
                role="img"
                aria-label={`Imagen de ${p.nombre}`}
              >
                {p.etiqueta && (
                  <div style={currentStyles.etiqueta} aria-label={`Etiqueta: ${p.etiqueta}`}>
                    {p.etiqueta.toUpperCase()}
                  </div>
                )}
              </div>
              <div style={currentStyles.cardContent}>
                <h2 id={`paquete-titulo-${p.id}`} style={currentStyles.cardTitle}>
                  {p.nombre}
                </h2>
                <div style={currentStyles.precio} aria-label={`Precio: ${p.precio.toFixed(2)} soles por persona`}>
                  S/ {p.precio.toFixed(2)}
                </div>
                <div style={currentStyles.region} aria-label={`Región: ${p.region}`}>
                  <span aria-hidden="true">📍</span> Región: {p.region}
                </div>
                <div style={currentStyles.buttonsContainer}>
                  <button
                    onClick={() => verDetalle(p.id, p.nombre)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        verDetalle(p.id, p.nombre);
                      }
                    }}
                    style={currentStyles.cotizarBtn}
                    aria-label={`Cotizar paquete ${p.nombre}`}
                  >
                    COTIZAR
                  </button>
                  <button
                    onClick={() => verDetalle(p.id, p.nombre)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        verDetalle(p.id, p.nombre);
                      }
                    }}
                    style={currentStyles.comprarBtn}
                    aria-label={`Ver detalles y comprar paquete ${p.nombre}`}
                  >
                    COMPRAR
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {paquetesFiltrados.length === 0 && (
          <div role="status" aria-live="polite" style={currentStyles.noResultados}>
            <p>No se encontraron paquetes con esos criterios.</p>
            <p>Sugerencia: Intenta modificar los filtros de búsqueda para obtener más resultados.</p>
          </div>
        )}
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f5f7fa",
    minHeight: "100vh",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  title: {
    color: "#0066cc",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  filtrosContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "center",
    marginBottom: "40px",
  },
  filtroItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontWeight: "600",
    color: "#1a1a1a",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "2px solid #0066cc",
    fontSize: "1rem",
    outline: "none",
    cursor: "pointer",
    minHeight: '48px',
    color: '#1a1a1a',
    background: 'white',
  },
  buscarBtn: {
    background: "linear-gradient(135deg, #ff6b35, #f7931e)",
    color: "white",
    padding: "12px 30px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 2px 8px rgba(255,107,53,0.3)",
    minHeight: '48px',
    minWidth: '120px',
  },
  paquetesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardImage: {
    position: "relative",
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  etiqueta: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "#ff6b35",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
  cardContent: {
    padding: "20px",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "1.2rem",
    color: "#1a1a1a",
  },
  precio: {
    color: "#ff6b35",
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  region: {
    color: "#4a4a4a",
    fontSize: "0.9rem",
    marginBottom: "15px",
  },
  buttonsContainer: {
    display: "flex",
    gap: "10px",
  },
  cotizarBtn: {
    flex: 1,
    padding: "14px",
    background: "white",
    border: "2px solid #0066cc",
    color: "#0066cc",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.95rem",
    minHeight: '48px',
  },
  comprarBtn: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #ff6b35, #f7931e)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.95rem",
    minHeight: '48px',
  },
  noResultados: {
    textAlign: "center",
    marginTop: "40px",
    color: "#666",
    fontSize: "1.2rem",
    padding: '20px',
    background: '#fff3cd',
    borderRadius: '8px',
    border: '2px solid #ffc107',
  },
};

const stylesAltoContraste = {
  ...styles,
  container: {
    ...styles.container,
    background: "#000",
    color: "#ffff00",
  },
  main: {
    ...styles.main,
  },
  title: {
    ...styles.title,
    color: "#ffff00",
  },
  filtrosContainer: {
    ...styles.filtrosContainer,
    background: "#000",
    border: "3px solid #ffff00",
  },
  label: {
    ...styles.label,
    color: "#ffff00",
  },
  select: {
    ...styles.select,
    background: "#000",
    color: "#ffff00",
    border: "3px solid #ffff00",
  },
  card: {
    ...styles.card,
    background: "#000",
    border: "3px solid #ffff00",
  },
  cardTitle: {
    ...styles.cardTitle,
    color: "#ffff00",
  },
  region: {
    ...styles.region,
    color: "#ffff00",
  },
  cotizarBtn: {
    ...styles.cotizarBtn,
    background: "#000",
    color: "#ffff00",
    border: "3px solid #ffff00",
  },
  comprarBtn: {
    ...styles.comprarBtn,
    background: "#ffff00",
    color: "#000",
    border: "3px solid #ffff00",
  },
};

export default PaquetesPage;
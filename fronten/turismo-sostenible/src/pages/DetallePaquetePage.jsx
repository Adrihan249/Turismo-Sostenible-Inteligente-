import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallePaquetePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paquete, setPaquete] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalCotizacion, setModalCotizacion] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    fetchPaquete();
  }, [id]);

  const fetchPaquete = async () => {
    try {
      const resPaquete = await fetch(`http://localhost:8080/api/paquetes/${id}`);
      const dataPaquete = await resPaquete.json();
      setPaquete(dataPaquete);

      try {
        const resDetalle = await fetch(`http://localhost:8080/api/detalle_paquete/${id}`);
        const dataDetalle = await resDetalle.json();
        setDetalle(dataDetalle);
      } catch (err) {
        console.log("No hay detalles adicionales");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar paquete:", error);
      setLoading(false);
    }
  };

  const calcularTotal = () => {
    if (!paquete) return 0;
    return (paquete.precio * cantidad).toFixed(2);
  };

  const handleComprar = () => {
    alert(`Comprando ${cantidad} boleto(s) por S/ ${calcularTotal()}`);
    setModalCotizacion(false);
  };

  const imagenes = paquete ? [
    paquete.imagenPrincipal,
    detalle?.imagenSecundaria1,
    detalle?.imagenSecundaria2,
    detalle?.imagenSecundaria3
  ].filter(Boolean) : [];

  if (loading) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  if (!paquete) {
    return <div style={styles.loading}>Paquete no encontrado</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.backLink}>
        <button onClick={() => navigate('/paquetes')} style={styles.backBtn}>
          ← Volver a Paquetes y Full Days
        </button>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          {/* 🔹 Header */}
          <div style={styles.headerCard}>
            <div>
              <h1 style={styles.mainTitle}>{paquete.nombre}</h1>
              <div style={styles.region}>📍 {paquete.region}</div>
            </div>
            <div style={styles.priceSection}>
              <div style={styles.priceAmount}>S/ {paquete.precio.toFixed(2)}</div>
              <div style={styles.porPersona}>por persona</div>
              <button onClick={() => setModalCotizacion(true)} style={styles.cotizarBtnMain}>
                COTIZAR
              </button>
            </div>
          </div>

          {/* 🔹 Galería */}
          <div style={styles.galleryCard}>
            <div style={{
              ...styles.mainImage,
              backgroundImage: `url(${imagenes[imagenActual] || 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'})`
            }}>
              {paquete.etiqueta && (
                <div style={styles.etiquetaBadge}>{paquete.etiqueta.toUpperCase()}</div>
              )}
            </div>

            {imagenes.length > 1 && (
              <div style={styles.thumbnails}>
                {imagenes.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setImagenActual(idx)}
                    style={{
                      ...styles.thumbnail,
                      backgroundImage: `url(${img})`,
                      border: imagenActual === idx ? '3px solid #ff6b35' : '2px solid #e0e0e0'
                    }}
                  />
                ))}
              </div>
            )}

          {detalle?.videoUrl && (
  <div style={styles.videoContainer}>
    <h3 style={styles.sectionTitle}>Video del Tour</h3>
    <iframe
      src={
        detalle.videoUrl.includes("watch?v=")
          ? detalle.videoUrl.replace("watch?v=", "embed/")
          : detalle.videoUrl
      }
      style={styles.video}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)}

          </div>

          {/* 🔹 Secciones de descripción (2 columnas + importante full width) */}
          <div style={styles.descriptionGrid}>
            {detalle?.descripcionDetallada && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Descripción del Tour</h3>
                <p style={styles.description}>{detalle.descripcionDetallada}</p>
              </div>
            )}

            {detalle?.incluye && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Incluye</h3>
                <ul style={styles.list}>
                  {detalle.incluye.split(',').map((item, idx) => (
                    <li key={idx} style={styles.listItem}>
                      <span style={styles.checkmark}>✓</span> {item.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detalle?.noIncluye && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>No Incluye</h3>
                <ul style={styles.list}>
                  {detalle.noIncluye.split(',').map((item, idx) => (
                    <li key={idx} style={styles.listItemNo}>
                      <span style={styles.crossmark}>✗</span> {item.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detalle?.queLlevar && (
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Qué llevar</h3>
                <ul style={styles.list}>
                  {detalle.queLlevar.split(',').map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {detalle?.importante && (
              <div style={styles.importantCardFullWidth}>
                <h3 style={styles.importantTitle}>⚠️ Importante</h3>
                <p style={styles.importantText}>{detalle.importante}</p>
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.reservaCard}>
            <h3 style={styles.reservaTitle}>Reserva Ahora</h3>
            <div style={styles.priceBig}>S/ {paquete.precio.toFixed(2)}</div>
            <div style={styles.porPersonaSide}>por persona</div>
            <button onClick={() => setModalCotizacion(true)} style={styles.reservarBtn}>
              COTIZAR AHORA
            </button>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>Información del Tour</h3>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>⏰</span>
              <span>Duración: Full Day</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>👥</span>
              <span>Grupo: Mínimo 10 personas</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>🚌</span>
              <span>Transporte incluido</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>🍽️</span>
              <span>Alimentación incluida</span>
            </div>
          </div>

          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>¿Dudas?</h3>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📞</span>
              <span>+51 926 568 799</span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📧</span>
              <span>terranova58@gmail.com</span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>💬</span>
              <span>WhatsApp disponible</span>
            </div>
          </div>
        </aside>
      </div>

      {/* 🔹 Modal Cotización */}
      {modalCotizacion && (
        <div style={styles.modalOverlay} onClick={() => setModalCotizacion(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalCotizacion(false)} style={styles.closeBtn}>✕</button>
            
            <h2 style={styles.modalTitle}>Calcula cuánto saldría tu boleto</h2>
            
            <div style={styles.modalBody}>
              <div style={styles.modalLeft}>
                <div style={{
                  ...styles.modalImage,
                  backgroundImage: `url(${paquete.imagenPrincipal || 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'})`
                }}>
                  <div style={styles.modalOverlayText}>
                    <div style={styles.fullDayBadge}>Full day 🔥</div>
                    <div style={styles.modalImageTitle}>{paquete.nombre}</div>
                  </div>
                </div>
              </div>

              <div style={styles.modalRight}>
                <h3 style={styles.modalSubtitle}>{paquete.nombre.toUpperCase()}</h3>
                
                <div style={styles.cantidadContainer}>
                  <label style={styles.cantidadLabel}>Cantidad de pasajeros:</label>
                  <div style={styles.cantidadControls}>
                    <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} style={styles.cantidadBtn}>-</button>
                    <input 
                      type="number" 
                      value={cantidad} 
                      onChange={e => setCantidad(Math.max(1, parseInt(e.target.value) || 1))} 
                      style={styles.cantidadInput}
                      min="1"
                    />
                    <button onClick={() => setCantidad(cantidad + 1)} style={styles.cantidadBtn}>+</button>
                  </div>
                </div>

                {detalle?.noIncluye && (
                  <div style={styles.noIncluyeModal}>
                    <h4 style={styles.noIncluyeTitle}>No incluye:</h4>
                    <ul style={styles.noIncluyeList}>
                      {detalle.noIncluye.split(',').slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={styles.totalSection}>
                  <span style={styles.totalLabel}>Costo boleto (s):</span>
                  <span style={styles.totalAmount}>S/ {calcularTotal()}</span>
                </div>

                <button onClick={handleComprar} style={styles.comprarBtn}>
                  CONFIRMAR COMPRA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 🔹 Estilos
const styles = {
  container: { fontFamily: "'Segoe UI', sans-serif", background: "#f5f7fa", minHeight: "100vh", padding: "20px" },
  loading: { textAlign: "center", padding: "100px 20px", fontSize: "1.5rem", color: "#666" },
  backLink: { maxWidth: "1400px", margin: "0 auto 20px" },
  backBtn: { background: "none", border: "none", color: "#0066cc", fontSize: "1rem", cursor: "pointer", padding: "10px 0" },
  mainContent: { maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  headerCard: { background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" },
  mainTitle: { fontSize: "2.5rem", fontWeight: "bold", color: "#0066cc", marginBottom: "10px" },
  region: { fontSize: "1.1rem", color: "#666" },
  priceSection: { textAlign: "right" },
  priceAmount: { fontSize: "3rem", fontWeight: "bold", color: "#ff6b35" },
  porPersona: { fontSize: "0.9rem", color: "#666", marginBottom: "15px" },
  cotizarBtnMain: { background: "linear-gradient(135deg, #ff6b35, #f7931e)", color: "white", padding: "12px 30px", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" },
  galleryCard: { background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  mainImage: { height: "400px", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px", position: "relative", marginBottom: "15px" },
  etiquetaBadge: { position: "absolute", top: "20px", left: "20px", background: "#ff6b35", color: "white", padding: "8px 20px", borderRadius: "25px", fontSize: "0.9rem", fontWeight: "bold" },
  thumbnails: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px" },
  thumbnail: { height: "100px", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px", cursor: "pointer", transition: "transform 0.3s" },
  videoContainer: { marginTop: "20px" },
  video: { width: "100%", height: "400px", borderRadius: "12px" },
  descriptionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" },
  card: { background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  sectionTitle: { fontSize: "1.5rem", fontWeight: "bold", color: "#0066cc", marginBottom: "15px" },
  description: { fontSize: "1rem", lineHeight: "1.6", color: "#444" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: { padding: "8px 0", fontSize: "0.95rem", color: "#444", borderBottom: "1px solid #f0f0f0" },
  listItemNo: { padding: "8px 0", fontSize: "0.95rem", color: "#444", borderBottom: "1px solid #f0f0f0" },
  checkmark: { color: "#4caf50", fontWeight: "bold", marginRight: "10px" },
  crossmark: { color: "#f44336", fontWeight: "bold", marginRight: "10px" },
  importantCardFullWidth: { background: "#fff3e0", border: "3px solid #ff9800", borderRadius: "12px", padding: "25px", gridColumn: "1 / -1" },
  importantTitle: { color: "#e65100", fontSize: "1.3rem", fontWeight: "bold", marginBottom: "10px" },
  importantText: { color: "#444", lineHeight: "1.8" },
  sidebar: { display: "flex", flexDirection: "column", gap: "20px" },
  reservaCard: { background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", textAlign: "center" },
  reservaTitle: { fontSize: "1.5rem", fontWeight: "bold", color: "#0066cc", marginBottom: "20px" },
  priceBig: { fontSize: "2.5rem", fontWeight: "bold", color: "#ff6b35", marginBottom: "5px" },
  porPersonaSide: { fontSize: "0.9rem", color: "#666", marginBottom: "20px" },
  reservarBtn: { width: "100%", background: "linear-gradient(135deg, #ff6b35, #f7931e)", color: "white", padding: "15px", border: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer" },
  infoCard: { background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  infoTitle: { fontSize: "1.3rem", fontWeight: "bold", color: "#0066cc", marginBottom: "15px" },
  infoItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", fontSize: "1rem", color: "#444", borderBottom: "1px solid #f0f0f0" },
  infoIcon: { fontSize: "1.5rem" },
  contactCard: { background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  contactTitle: { fontSize: "1.3rem", fontWeight: "bold", color: "#0066cc", marginBottom: "15px" },
  contactItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", fontSize: "1rem", color: "#444" },
  contactIcon: { fontSize: "1.5rem" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalContent: { background: "white", borderRadius: "20px", maxWidth: "900px", width: "90%", maxHeight: "90vh", overflow: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: "15px", right: "20px", background: "none", border: "none", fontSize: "2rem", cursor: "pointer", color: "#666", zIndex: 1 },
  modalTitle: { textAlign: "center", fontSize: "1.8rem", fontWeight: "bold", padding: "30px 20px 20px", borderBottom: "2px solid #f0f0f0" },
  modalBody: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" },
  modalLeft: { padding: "0" },
  modalImage: { height: "100%", minHeight: "500px", backgroundSize: "cover", backgroundPosition: "center", position: "relative" },
  modalOverlayText: { position: "absolute", bottom: "0", left: "0", right: "0", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "40px 20px 20px" },
  fullDayBadge: { background: "#4caf50", color: "white", padding: "8px 15px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "bold", display: "inline-block", marginBottom: "10px" },
  modalImageTitle: { color: "white", fontSize: "1.5rem", fontWeight: "bold" },
  modalRight: { padding: "30px" },
  modalSubtitle: { fontSize: "1.3rem", fontWeight: "bold", color: "#333", marginBottom: "25px" },
  cantidadContainer: { marginBottom: "25px" },
  cantidadLabel: { display: "block", fontWeight: "600", marginBottom: "10px", color: "#333" },
  cantidadControls: { display: "flex", alignItems: "center", gap: "15px" },
  cantidadBtn: { width: "40px", height: "40px", background: "#f0f0f0", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1.5rem", cursor: "pointer", fontWeight: "bold" },
  cantidadInput: { width: "80px", textAlign: "center", padding: "10px", fontSize: "1.2rem", border: "2px solid #ddd", borderRadius: "8px" },
  noIncluyeModal: { background: "#f9f9f9", padding: "20px", borderRadius: "10px", marginBottom: "25px" },
  noIncluyeTitle: { fontWeight: "bold", marginBottom: "10px", color: "#333" },
  noIncluyeList: { listStyle: "none", padding: 0, margin: 0, fontSize: "0.9rem", color: "#666" },
  totalSection: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "#f0f7ff", borderRadius: "10px", marginBottom: "20px" },
  totalLabel: { fontSize: "1.2rem", fontWeight: "600", color: "#333" },
  totalAmount: { fontSize: "2rem", fontWeight: "bold", color: "#ff6b35" },
  comprarBtn: { width: "100%", background: "linear-gradient(135deg, #4caf50, #66bb6a)", color: "white", padding: "15px", border: "none", borderRadius: "10px", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer" },
};

export default DetallePaquetePage;

import React from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Vive la mejor y más completa experiencia. Viajá y descúbrelo por ti mismo
          </h1>
          <p style={styles.heroSubtitle}>
            Descubre los destinos más fascinantes del Perú
          </p>
         <button
         
  style={styles.heroBtn}
  
  onClick={() => navigate("/paquetes")}
>
  Explorar Paquetes
</button>
        </div>
        
        <button style={{...styles.carouselBtn, ...styles.carouselBtnLeft}}>‹</button>
        <button style={{...styles.carouselBtn, ...styles.carouselBtnRight}}>›</button>
        
        <div style={styles.carouselIndicators}>
          <div style={{...styles.indicator, ...styles.indicatorActive}}></div>
          <div style={styles.indicator}></div>
          <div style={styles.indicator}></div>
          <div style={styles.indicator}></div>
          <div style={styles.indicator}></div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section style={styles.whyUs}>
        <h2 style={styles.sectionTitle}>Por qué elegirnos</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📱</div>
            <h3 style={styles.featureTitle}>Compra en línea</h3>
            <p style={styles.featureDesc}>
              Accede a nuestra tienda online desde cualquier dispositivo y realiza tus compras de forma segura las 24 horas del día.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>👥</div>
            <h3 style={styles.featureTitle}>Expertos en turismo</h3>
            <p style={styles.featureDesc}>
              Contamos con un equipo altamente capacitado y con amplia experiencia para brindarte la mejor asesoría personalizada.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💰</div>
            <h3 style={styles.featureTitle}>Tarifas más bajas</h3>
            <p style={styles.featureDesc}>
              Ofrecemos los mejores precios del mercado sin comprometer la calidad de nuestros servicios turísticos.
            </p>
          </div>
        </div>
      </section>

      {/* Visión y Misión */}
      <section style={styles.visionMission}>
        <div style={styles.circleDecor}></div>
        <div style={styles.circleDecorInner}></div>
        <div style={styles.vmGrid}>
          <div style={styles.vmCard}>
            <h2 style={styles.vmTitle}>
              <span style={styles.vmIcon}>👁️</span> Visión
            </h2>
            <p style={styles.vmText}>
              Ser la agencia de viajes líder en el Perú, reconocida por ofrecer experiencias turísticas excepcionales y sostenibles. Buscamos expandir nuestros servicios a nivel internacional, promoviendo la riqueza cultural y natural del Perú.
            </p>
          </div>
          <div style={styles.vmCard}>
            <h2 style={styles.vmTitle}>
              <span style={styles.vmIcon}>🎯</span> Misión
            </h2>
            <ul style={styles.vmList}>
              <li style={styles.vmListItem}>
                <span style={styles.vmBullet}>•</span>
                Conectar a viajeros con las maravillas del Perú
              </li>
              <li style={styles.vmListItem}>
                <span style={styles.vmBullet}>•</span>
                Ofrecer servicios turísticos de calidad superior
              </li>
              <li style={styles.vmListItem}>
                <span style={styles.vmBullet}>•</span>
                Garantizar la satisfacción y seguridad del cliente
              </li>
              <li style={styles.vmListItem}>
                <span style={styles.vmBullet}>•</span>
                Promover el turismo responsable y sostenible
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section style={styles.values}>
        <div style={styles.circleDecorLeft}></div>
        <div style={styles.circleDecorRight}></div>
        <h2 style={styles.valuesTitle}>Nuestros valores</h2>
        <p style={styles.valuesSubtitle}>
          Son los pilares fundamentales de nuestro trabajo diario. Nos guían en cada decisión y nos impulsan a ofrecer experiencias excepcionales.
        </p>
        <div style={styles.valuesGrid}>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>🤝</div>
            <div style={styles.valueContent}>
              <h3 style={styles.valueTitle}>Compromiso</h3>
              <p style={styles.valueDesc}>
                Nos comprometemos con la satisfacción total de nuestros clientes en cada experiencia.
              </p>
            </div>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>✨</div>
            <div style={styles.valueContent}>
              <h3 style={styles.valueTitle}>Calidad</h3>
              <p style={styles.valueDesc}>
                Ofrecemos servicios de alta calidad con atención meticulosa al detalle.
              </p>
            </div>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>🌿</div>
            <div style={styles.valueContent}>
              <h3 style={styles.valueTitle}>Sostenibilidad</h3>
              <p style={styles.valueDesc}>
                Promovemos el turismo responsable y el respeto al medio ambiente.
              </p>
            </div>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>💼</div>
            <div style={styles.valueContent}>
              <h3 style={styles.valueTitle}>Profesionalismo</h3>
              <p style={styles.valueDesc}>
                Equipo altamente capacitado para brindar el mejor servicio personalizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas que nos respaldan */}
      <section style={styles.brands}>
        <h2 style={styles.sectionTitle}>Marcas que nos respaldan</h2>
        <div style={styles.brandsGrid}>
          <div style={{...styles.brandLogo, ...styles.brand1}}>Coca-Cola</div>
          <div style={{...styles.brandLogo, ...styles.brand2}}>Banco</div>
          <div style={{...styles.brandLogo, ...styles.brand3}}>Telefonía</div>
          <div style={{...styles.brandLogo, ...styles.brand4}}>Retail</div>
          <div style={{...styles.brandLogo, ...styles.brand5}}>Tecnología</div>
          <div style={{...styles.brandLogo, ...styles.brand6}}>Alimentos</div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    lineHeight: '1.6',
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  hero: {
    position: 'relative',
    height: '500px',
    background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://blog.incarail.com/wp-content/uploads/2024/10/Museo-de-Arqueologia-y-Arte.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    overflow: 'hidden',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  heroContent: {
    maxWidth: '900px',
    padding: '0 20px',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    marginBottom: '30px',
    textShadow: '1px 1px 5px rgba(0,0,0,0.8)',
  },
  heroBtn: {
    background: '#ff6b35',
    color: 'white',
    padding: '15px 40px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,107,53,0.4)',
  },
  carouselBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselBtnLeft: {
    left: '20px',
  },
  carouselBtnRight: {
    right: '20px',
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
  },
  indicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
  },
  indicatorActive: {
    background: 'white',
    width: '30px',
    borderRadius: '5px',
  },
  whyUs: {
    padding: '80px 20px',
    background: 'white',
    width: '100%',
    margin: 0,
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '60px',
    color: '#0066cc',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '50px',
  },
  featureCard: {
    textAlign: 'center',
  },
  featureIcon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    background: '#fff3ed',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    color: '#0066cc',
    marginBottom: '15px',
  },
  featureDesc: {
    color: '#666',
    lineHeight: '1.8',
  },
  visionMission: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #1a237e, #0066cc, #42a5f5)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    margin: 0,
  },
  circleDecor: {
    position: 'absolute',
    top: '40px',
    right: '40px',
    width: '250px',
    height: '250px',
    border: '8px solid rgba(255,255,255,0.2)',
    borderRadius: '50%',
  },
  circleDecorInner: {
    position: 'absolute',
    top: '70px',
    right: '70px',
    width: '190px',
    height: '190px',
    border: '8px solid rgba(255,255,255,0.2)',
    borderRadius: '50%',
  },
  vmGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '40px',
    position: 'relative',
    zIndex: 1,
  },
  vmCard: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    padding: '40px',
  },
  vmTitle: {
    fontSize: '2rem',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  vmIcon: {
    fontSize: '2.5rem',
  },
  vmText: {
    color: '#e3f2fd',
    lineHeight: '1.8',
  },
  vmList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  vmListItem: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    color: '#e3f2fd',
  },
  vmBullet: {
    color: '#ff9800',
    fontSize: '1.5rem',
    marginTop: '-5px',
  },
  values: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #ff9800, #ffb74d, #ffd54f)',
    position: 'relative',
    overflow: 'hidden',
  },
  circleDecorLeft: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    width: '150px',
    height: '150px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
  },
  circleDecorRight: {
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    width: '200px',
    height: '200px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
  },
  valuesTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  valuesSubtitle: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 50px',
    color: '#555',
    fontSize: '1.1rem',
  },
  valuesGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '30px',
    position: 'relative',
    zIndex: 1,
  },
  valueCard: {
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '15px',
    padding: '30px',
    display: 'flex',
    gap: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  valueIcon: {
    fontSize: '3rem',
    flexShrink: 0,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  valueDesc: {
    color: '#555',
    lineHeight: '1.8',
  },
  brands: {
    padding: '80px 20px',
    background: '#f5f5f5',
  },
  brandsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
    alignItems: 'center',
  },
  brandLogo: {
    width: '140px',
    height: '90px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    opacity: 0.85,
  },
  brand1: { background: '#dc3545' },
  brand2: { background: '#0066cc' },
  brand3: { background: '#28a745' },
  brand4: { background: '#ffc107', color: '#333' },
  brand5: { background: '#6f42c1' },
  brand6: { background: '#e83e8c' },
};

export default HomePage;
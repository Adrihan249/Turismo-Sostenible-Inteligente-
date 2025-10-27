import React, { useState } from "react";

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    asunto: "",
    mensaje: "",
    aceptaTerminos: false,
    newsletterEmail: ""
  });

  const [tamanoTexto, setTamanoTexto] = useState(() => {
    return parseFloat(localStorage.getItem('tamanoTexto')) || 1;
  });
  const [altoContraste, setAltoContraste] = useState(() => {
    return localStorage.getItem('altoContraste') === 'true';
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    alert(`Mensaje enviado correctamente!\n\nNos pondremos en contacto contigo pronto, ${formData.nombres}.`);
    
    // Resetear formulario
    setFormData({
      nombres: "",
      apellidos: "",
      telefono: "",
      email: "",
      asunto: "",
      mensaje: "",
      aceptaTerminos: false,
      newsletterEmail: ""
    });
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (formData.newsletterEmail) {
      alert(`¡Gracias por suscribirte!\nTe hemos enviado un correo a: ${formData.newsletterEmail}`);
      setFormData({ ...formData, newsletterEmail: "" });
    }
  };

  const cambiarTamanoTexto = (accion) => {
    let nuevoTamano = tamanoTexto;
    if (accion === 'aumentar' && tamanoTexto < 2) nuevoTamano = tamanoTexto + 0.1;
    else if (accion === 'disminuir' && tamanoTexto > 0.8) nuevoTamano = tamanoTexto - 0.1;
    else if (accion === 'reset') nuevoTamano = 1;
    setTamanoTexto(nuevoTamano);
    localStorage.setItem('tamanoTexto', nuevoTamano.toString());
  };

  const toggleAltoContraste = () => {
    const nuevoEstado = !altoContraste;
    setAltoContraste(nuevoEstado);
    localStorage.setItem('altoContraste', nuevoEstado.toString());
  };

  const currentStyles = altoContraste ? stylesAltoContraste : styles;

  return (
    <div style={{...currentStyles.container, fontSize: `${tamanoTexto}rem`}}>
      {/* Toolbar de accesibilidad */}
      <div style={styles.a11yToolbar} role="toolbar" aria-label="Herramientas de accesibilidad">
        <button onClick={() => cambiarTamanoTexto('disminuir')} style={styles.a11yBtn} aria-label="Disminuir tamaño">A-</button>
        <button onClick={() => cambiarTamanoTexto('reset')} style={styles.a11yBtn} aria-label="Tamaño normal">A</button>
        <button onClick={() => cambiarTamanoTexto('aumentar')} style={styles.a11yBtn} aria-label="Aumentar tamaño">A+</button>
        <button onClick={toggleAltoContraste} style={styles.a11yBtn} aria-label="Alto contraste" aria-pressed={altoContraste}>◐</button>
      </div>

      <main style={currentStyles.main}>
        {/* Bienvenida */}
        <section style={currentStyles.welcomeSection} aria-labelledby="welcome-title">
          <div style={currentStyles.welcomeContent}>
            <h1 id="welcome-title" style={currentStyles.welcomeTitle}>
              ¡BIENVENIDO A TERRANOVA!
            </h1>
            <p style={currentStyles.welcomeText}>
              Cuéntanos tus consultas, estamos para apoyarte
            </p>
            <p style={currentStyles.welcomeSubtext}>
              Si tienes alguna duda o quieres obtener más información, completa nuestro formulario de contacto o llama a nuestros teléfonos.
            </p>
          </div>
          <div style={currentStyles.welcomeImage}>
            <img 
              src="https://markepymes.com/wp-content/uploads/2018/05/como-escribir-un-buen-guion-para-el-servicio-de-atencion-al-cliente.jpg"
              alt="Servicio al cliente"
              style={currentStyles.illustrationImg}
            />
          </div>
        </section>

        {/* Formulario de contacto */}
        <section style={currentStyles.formSection} aria-labelledby="form-title">
          <h2 id="form-title" style={currentStyles.formTitle}>
            Contáctenos rellenando este formulario
          </h2>

          <div style={currentStyles.formGrid}>
            <div style={currentStyles.inputGroup}>
              <label htmlFor="nombres" style={currentStyles.label}>
                <span style={currentStyles.required}>*</span> Nombres completos:
              </label>
              <input
                id="nombres"
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                style={currentStyles.input}
                required
                aria-required="true"
              />
            </div>

            <div style={currentStyles.inputGroup}>
              <label htmlFor="apellidos" style={currentStyles.label}>
                <span style={currentStyles.required}>*</span> Apellidos:
              </label>
              <input
                id="apellidos"
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                style={currentStyles.input}
                required
                aria-required="true"
              />
            </div>

            <div style={currentStyles.inputGroup}>
              <label htmlFor="telefono" style={currentStyles.label}>
                <span style={currentStyles.required}>*</span> Número de teléfono:
              </label>
              <div style={currentStyles.phoneInput}>
                <img src="https://flagcdn.com/w40/pe.png" alt="Perú" style={currentStyles.flag} />
                <span style={currentStyles.phoneCode}>+51</span>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  style={currentStyles.phoneField}
                  placeholder="999 999 999"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div style={currentStyles.inputGroup}>
              <label htmlFor="email" style={currentStyles.label}>
                <span style={currentStyles.required}>*</span> Correo electrónico:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={currentStyles.input}
                required
                aria-required="true"
              />
            </div>
          </div>

          <div style={currentStyles.fullWidthGroup}>
            <label htmlFor="asunto" style={currentStyles.label}>
              <span style={currentStyles.required}>*</span> Seleccione el canal del cual obtuvo nuestra información:
            </label>
            <select
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              style={currentStyles.select}
              required
              aria-required="true"
            >
              <option value="">Seleccionar...</option>
              <option value="redes-sociales">Redes Sociales</option>
              <option value="recomendacion">Recomendación</option>
              <option value="publicidad">Publicidad</option>
              <option value="buscador">Buscador Web</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div style={currentStyles.fullWidthGroup}>
            <label htmlFor="mensaje" style={currentStyles.label}>
              Mensaje:
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              style={currentStyles.textarea}
              rows={5}
              placeholder="Escribe tu mensaje aquí..."
              aria-label="Escribe tu mensaje"
            />
          </div>

          <div style={currentStyles.checkboxGroup}>
            <input
              type="checkbox"
              id="terminos"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              style={currentStyles.checkbox}
              required
              aria-required="true"
            />
            <label htmlFor="terminos" style={currentStyles.checkboxLabel}>
              He leído, entiendo y acepto los términos y condiciones
            </label>
          </div>

          <button 
            onClick={handleSubmit} 
            style={currentStyles.submitBtn}
            aria-label="Enviar formulario de contacto"
          >
            Enviar
          </button>
        </section>

        {/* Ubicación */}
        <section style={currentStyles.locationSection} aria-labelledby="location-title">
          <h2 id="location-title" style={currentStyles.sectionTitle}>
            Estamos ubicados en:
          </h2>
          <p style={currentStyles.locationText}>
            🏢 <strong>Jirón Ancash, Junín 3, Arequipa</strong> ó en la <strong>Plaza Bolívar</strong>, en el centro histórico de Arequipa
          </p>
        </section>

        {/* Atención al cliente */}
        <section style={currentStyles.supportSection} aria-labelledby="support-title">
          <div style={currentStyles.supportContent}>
            <div style={currentStyles.supportText}>
              <h2 id="support-title" style={currentStyles.sectionTitle}>
                También puedes llamar a nuestros representantes
              </h2>
              <div style={currentStyles.contactInfo}>
                <div style={currentStyles.contactItem}>
                  <span style={currentStyles.icon}>📞</span>
                  <a href="tel:+51926568799" style={currentStyles.contactLink}>
                    +51 926 568 799
                  </a>
                </div>
                <div style={currentStyles.contactItem}>
                  <span style={currentStyles.icon}>📱</span>
                  <span>WhatsApp disponible 24/7</span>
                </div>
              </div>
            </div>
            <div style={currentStyles.supportImage}>
              <img 
                src="https://www.genesys.com/media/BBVA-Per%C3%BA-mantiene-la-excelencia-en-el-servicio-al-cliente-durante-la-crisis-COVID-19.jpg"
                alt="Soporte al cliente"
                style={currentStyles.illustrationImg}
              />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section style={currentStyles.newsletterSection} aria-labelledby="newsletter-title">
          <div style={currentStyles.newsletterContent}>
            <div style={currentStyles.newsletterText}>
              <h2 id="newsletter-title" style={currentStyles.sectionTitle}>
                Envíanos un correo electrónico y nos pondremos en contacto con usted
              </h2>
              <p style={currentStyles.newsletterDesc}>
                Para suscribirte con nuestro equipo de forma instantánea y recibir notificaciones y novedades sobre nuestros paquetes directamente en tu correo, ingresa tu email.
              </p>
              <div style={currentStyles.newsletterForm}>
                <input
                  type="email"
                  name="newsletterEmail"
                  value={formData.newsletterEmail}
                  onChange={handleChange}
                  placeholder="Ingresa tu correo electrónico"
                  style={currentStyles.newsletterInput}
                  aria-label="Email para newsletter"
                />
                <button 
                  onClick={handleNewsletter}
                  style={currentStyles.newsletterBtn}
                  aria-label="Suscribirse al newsletter"
                >
                  Enviar
                </button>
              </div>
            </div>
            <div style={currentStyles.newsletterImage}>
              <img 
                src="https://www.creatidata.com/assets/images/empresas-mailing-masivo-peru-1068x534.jpg"
                alt="Enviar email"
                style={currentStyles.illustrationImg}
              />
            </div>
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
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  welcomeSection: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "40px",
    alignItems: "center",
    marginBottom: "50px",
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },
  welcomeContent: {},
  welcomeTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: "20px",
  },
  welcomeText: {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "15px",
    fontWeight: "600",
  },
  welcomeSubtext: {
    fontSize: "1rem",
    color: "#666",
    lineHeight: "1.6",
  },
  welcomeImage: {
    textAlign: "center",
  },
  illustrationImg: {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
  },
  formSection: {
    background: "#e3f2fd",
    padding: "40px",
    borderRadius: "15px",
    marginBottom: "50px",
    border: "3px solid #0066cc",
  },
  formTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: "30px",
    textAlign: "center",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  fullWidthGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "600",
    marginBottom: "8px",
    color: "#1a1a1a",
    fontSize: "0.95rem",
  },
  required: {
    color: "#f44336",
    marginRight: "4px",
  },
  input: {
    padding: "12px",
    border: "2px solid #90caf9",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    minHeight: "48px",
    background: "white",
  },
  phoneInput: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "white",
    border: "2px solid #90caf9",
    borderRadius: "8px",
    padding: "0 12px",
    minHeight: "48px",
  },
  flag: {
    width: "24px",
    height: "auto",
  },
  phoneCode: {
    fontWeight: "bold",
    color: "#666",
  },
  phoneField: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "1rem",
    padding: "12px 0",
  },
  select: {
    padding: "12px",
    border: "2px solid #90caf9",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    cursor: "pointer",
    minHeight: "48px",
    background: "white",
  },
  textarea: {
    padding: "12px",
    border: "2px solid #90caf9",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical",
    background: "white",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "25px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  checkboxLabel: {
    fontSize: "0.95rem",
    color: "#333",
    cursor: "pointer",
  },
  submitBtn: {
    width: "100%",
    background: "#ffa726",
    color: "white",
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    minHeight: "48px",
    transition: "all 0.3s",
  },
  locationSection: {
    background: "#fff3e0",
    padding: "30px",
    borderRadius: "15px",
    marginBottom: "50px",
    border: "2px solid #ff9800",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: "15px",
  },
  locationText: {
    fontSize: "1.1rem",
    color: "#333",
    lineHeight: "1.8",
  },
  supportSection: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    marginBottom: "50px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },
  supportContent: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "40px",
    alignItems: "center",
  },
  supportText: {},
  contactInfo: {
    marginTop: "20px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px",
    fontSize: "1.1rem",
  },
  icon: {
    fontSize: "1.5rem",
  },
  contactLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: "600",
  },
  supportImage: {
    textAlign: "center",
  },
  newsletterSection: {
    background: "#e8f5e9",
    padding: "40px",
    borderRadius: "15px",
    border: "2px solid #4caf50",
  },
  newsletterContent: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "40px",
    alignItems: "center",
  },
  newsletterText: {},
  newsletterDesc: {
    fontSize: "1rem",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  newsletterForm: {
    display: "flex",
    gap: "10px",
  },
  newsletterInput: {
    flex: 1,
    padding: "12px",
    border: "2px solid #4caf50",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    minHeight: "48px",
  },
  newsletterBtn: {
    background: "#4caf50",
    color: "white",
    padding: "12px 30px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    minHeight: "48px",
  },
  newsletterImage: {
    textAlign: "center",
  },
};

const stylesAltoContraste = {
  ...styles,
  container: {
    ...styles.container,
    background: "#000",
  },
  welcomeSection: {
    ...styles.welcomeSection,
    background: "#000",
    border: "3px solid #ffff00",
  },
  welcomeTitle: {
    ...styles.welcomeTitle,
    color: "#ffff00",
  },
  welcomeText: {
    ...styles.welcomeText,
    color: "#ffff00",
  },
  welcomeSubtext: {
    ...styles.welcomeSubtext,
    color: "#ffff00",
  },
  formSection: {
    ...styles.formSection,
    background: "#000",
    border: "3px solid #ffff00",
  },
  formTitle: {
    ...styles.formTitle,
    color: "#ffff00",
  },
  label: {
    ...styles.label,
    color: "#ffff00",
  },
  input: {
    ...styles.input,
    background: "#000",
    border: "3px solid #ffff00",
    color: "#ffff00",
  },
  phoneInput: {
    ...styles.phoneInput,
    background: "#000",
    border: "3px solid #ffff00",
  },
  phoneField: {
    ...styles.phoneField,
    background: "#000",
    color: "#ffff00",
  },
  select: {
    ...styles.select,
    background: "#000",
    border: "3px solid #ffff00",
    color: "#ffff00",
  },
  textarea: {
    ...styles.textarea,
    background: "#000",
    border: "3px solid #ffff00",
    color: "#ffff00",
  },
  submitBtn: {
    ...styles.submitBtn,
    background: "#ffff00",
    color: "#000",
  },
  locationSection: {
    ...styles.locationSection,
    background: "#000",
    border: "3px solid #ffff00",
  },
  sectionTitle: {
    ...styles.sectionTitle,
    color: "#ffff00",
  },
  locationText: {
    ...styles.locationText,
    color: "#ffff00",
  },
  supportSection: {
    ...styles.supportSection,
    background: "#000",
    border: "3px solid #ffff00",
  },
  contactItem: {
    ...styles.contactItem,
    color: "#ffff00",
  },
  contactLink: {
    ...styles.contactLink,
    color: "#ffff00",
  },
  newsletterSection: {
    ...styles.newsletterSection,
    background: "#000",
    border: "3px solid #ffff00",
  },
  newsletterDesc: {
    ...styles.newsletterDesc,
    color: "#ffff00",
  },
  newsletterInput: {
    ...styles.newsletterInput,
    background: "#000",
    border: "3px solid #ffff00",
    color: "#ffff00",
  },
  newsletterBtn: {
    ...styles.newsletterBtn,
    background: "#ffff00",
    color: "#000",
  },
};

export default ContactoPage;
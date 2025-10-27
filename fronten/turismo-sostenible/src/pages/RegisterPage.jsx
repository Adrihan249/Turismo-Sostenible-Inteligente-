import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Importa el método login del contexto
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    aceptaTerminos: false
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
    
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre + " " + formData.apellido,
          email: formData.email,
          password: formData.password,
          rol: "USER"
        })
      });

      if (response.ok) {
        let data;
        try {
          data = await response.json(); 
        } catch {
          // Si no devuelve JSON, creamos el objeto manualmente
          data = {
            nombre: formData.nombre + " " + formData.apellido,
            email: formData.email,
            rol: "USER"
          };
        }
        console.log("Registro exitoso:", data);
        alert("Usuario registrado correctamente");
        
        // ✅ Iniciar sesión automáticamente después del registro
        login(data);
        navigate("/");
      } else {
        const text = await response.text();
        console.error("Error en registro:", response.status, text);
        alert("Error en registro: " + text);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleGoogleRegister = () => {
    console.log("Registro con Google");
    // Después de OAuth exitoso, usa login(userData) y navigate("/")
  };
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Vívelo en Perú</h1>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.formContainer}>
          <div style={styles.illustrationSide}>
            <div style={styles.illustrationContent}>
              <h2 style={styles.brandTitle}>Crear Cuenta</h2>
              
              <button onClick={handleGoogleRegister} style={styles.googleBtnLeft}>
                <span style={styles.googleIcon}>G</span>
                Registrarse con Google
              </button>

              <div style={styles.imageContainer}>
                <div style={styles.imageWrapper}>
                  <img 
                    src="https://www.machupicchureservations.org/wp-content/themes/machupicchureservations-child/images/placeholder_mobile.jpg" 
                    alt="Machu Picchu"
                    style={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={styles.formSide}>
            <div style={styles.formWrapper}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="+51 999 999 999"
                  />
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div style={styles.termsSection}>
                <p style={styles.termsText}>
                  Dejar vacante si cuenta nueva, nuestra política de privacidad explica cómo tratamos tus datos y mínimos que como usamos, también entiendo que Terranova recopila información sobre mi actividad.
                </p>
              </div>

              <div style={styles.submitSection}>
                <button onClick={handleSubmit} style={styles.submitBtn}>
                  Registrarte
                </button>
              </div>

              <div style={styles.loginPrompt}>
                <span>¿Ya tienes cuenta?</span>
                <a href="/login" style={styles.loginLink}>Iniciar sesión</a>
              </div>

              <div style={styles.policyNote}>
                <p style={styles.policyText}>
                  Al crear tu cuenta si acepta nuestra política de privacidad
                </p>
              </div>

              <label style={styles.checkboxLabelLarge}>
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  style={styles.checkbox}
                  required
                />
                ¿Te llama la atención? Permíteme saber en adelante, si productos nuevos y características en progreso
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "#f5f5f5",
  },
  hero: {
    width: "100%",
    height: "200px",
    background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://www.machupicchureservations.org/wp-content/themes/machupicchureservations-child/images/placeholder_mobile.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  heroOverlay: {
    position: "absolute",
    bottom: "20px",
    right: "40px",
    background: "rgba(0, 102, 204, 0.85)",
    padding: "15px 40px",
    borderRadius: "8px",
    backdropFilter: "blur(10px)",
  },
  heroTitle: {
    color: "white",
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: 0,
    fontFamily: "cursive",
  },
  content: {
    maxWidth: "1200px",
    margin: "-50px auto 60px",
    padding: "0 20px",
  },
  formContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
    minHeight: "700px",
  },
  illustrationSide: {
    background: "white",
    padding: "40px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRight: "1px solid #e0e0e0",
  },
  illustrationContent: {
    textAlign: "center",
  },
  brandTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: "30px",
  },
  googleBtnLeft: {
    width: "100%",
    padding: "12px",
    background: "#4285f4",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  googleIcon: {
    background: "white",
    color: "#4285f4",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: "40px",
  },
  imageWrapper: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  formSide: {
    padding: "40px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "600px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "5px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#333",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "2px solid #e0e0e0",
    borderRadius: "6px",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
  },
  termsSection: {
    marginBottom: "20px",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "8px",
  },
  termsText: {
    fontSize: "0.85rem",
    color: "#666",
    lineHeight: "1.6",
    margin: 0,
  },
  submitSection: {
    marginBottom: "20px",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  loginPrompt: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "0.95rem",
    color: "#666",
  },
  loginLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: "600",
    marginLeft: "5px",
  },
  policyNote: {
    marginBottom: "20px",
  },
  policyText: {
    fontSize: "0.85rem",
    color: "#666",
    textAlign: "center",
    margin: 0,
  },
  checkboxLabelLarge: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    fontSize: "0.85rem",
    color: "#666",
    cursor: "pointer",
    lineHeight: "1.6",
  },
  checkbox: {
    marginTop: "3px",
    cursor: "pointer",
  },
};

export default RegisterPage;
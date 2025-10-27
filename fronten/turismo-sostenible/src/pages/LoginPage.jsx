// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    recordar: false
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
  try {
    const response = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data);

      // Verifica si el usuario tiene rol ADMIN
      if (data.rol && data.rol.toUpperCase() === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert("Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al iniciar sesión");
  }
};

  const handleGoogleLogin = () => {
    console.log("Login con Google");
    // Redirigir al Home después de OAuth
    navigate("/");
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
          {/* Lado izquierdo */}
          <div style={styles.illustrationSide}>
            <div style={styles.illustrationContent}>
              <h2 style={styles.brandTitle}>TERRANOVA EXPERIENCE</h2>
              <h3 style={styles.formTitle}>Iniciar sesión</h3>
              <p style={styles.subtitle}>Ingresa con tus datos de siempre</p>
              <div style={styles.illustration}>
                <span style={styles.illustrationIcon}>👨‍💼</span>
                <span style={styles.illustrationIcon}>📊</span>
                <span style={styles.illustrationIcon}>💻</span>
              </div>
            </div>
          </div>

          {/* Lado derecho - Formulario */}
          <div style={styles.formSide}>
            <form onSubmit={handleSubmit} style={styles.form}>
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

              <div style={styles.checkboxRow}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="recordar"
                    checked={formData.recordar}
                    onChange={handleChange}
                    style={styles.checkbox}
                  />
                  Recordar datos
                </label>
                <a href="/recuperar" style={styles.forgotLink}>
                  ¿Olvidaste la contraseña?
                </a>
              </div>

              <button type="submit" style={styles.submitBtn}>
                Iniciar sesión
              </button>

              <div style={styles.registerPrompt}>
                <span>¿No estás registrado?</span>
                <a href="/register" style={styles.registerLink}>Crea tu cuenta</a>
              </div>

              <div style={styles.divider}>
                <span style={styles.dividerText}>O</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                style={styles.googleBtn}
              >
                <span style={styles.googleIcon}>G</span>
                Continuar con Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { width: "100%", minHeight: "100vh", background: "#f5f5f5" },
  hero: { width: "100%", height: "200px", background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://blog.incarail.com/wp-content/uploads/2024/10/Museo-de-Arqueologia-y-Arte.jpg')", backgroundSize: "cover", backgroundPosition: "center", position: "relative" },
  heroOverlay: { position: "absolute", bottom: "20px", right: "40px", background: "rgba(0, 102, 204, 0.85)", padding: "15px 40px", borderRadius: "8px", backdropFilter: "blur(10px)" },
  heroTitle: { color: "white", fontSize: "2.5rem", fontWeight: "bold", margin: 0, fontFamily: "cursive" },
  content: { maxWidth: "1200px", margin: "-50px auto 60px", padding: "0 20px" },
  formContainer: { display: "grid", gridTemplateColumns: "1fr 1fr", background: "white", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", overflow: "hidden", minHeight: "600px" },
  illustrationSide: { background: "linear-gradient(135deg, #0066cc, #004999)", padding: "60px 40px", display: "flex", flexDirection: "column", justifyContent: "center", color: "white" },
  illustrationContent: { textAlign: "center" },
  brandTitle: { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px", letterSpacing: "2px" },
  formTitle: { fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" },
  subtitle: { fontSize: "1rem", opacity: 0.9, marginBottom: "40px" },
  illustration: { display: "flex", justifyContent: "center", gap: "30px", marginTop: "40px" },
  illustrationIcon: { fontSize: "4rem", animation: "float 3s ease-in-out infinite" },
  formSide: { padding: "60px 50px", display: "flex", alignItems: "center", justifyContent: "center" },
  form: { width: "100%", maxWidth: "400px" },
  inputGroup: { marginBottom: "25px" },
  label: { display: "block", marginBottom: "8px", color: "#333", fontSize: "0.95rem", fontWeight: "500" },
  input: { width: "100%", padding: "12px 15px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "1rem", transition: "all 0.3s ease", outline: "none", boxSizing: "border-box" },
  checkboxRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#666", cursor: "pointer" },
  checkbox: { cursor: "pointer" },
  forgotLink: { color: "#ff9800", fontSize: "0.9rem", textDecoration: "none", fontWeight: "500" },
  submitBtn: { width: "100%", padding: "14px", background: "#ff9800", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease", marginBottom: "20px" },
  registerPrompt: { textAlign: "center", marginBottom: "25px", fontSize: "0.95rem", color: "#666" },
  registerLink: { color: "#0066cc", textDecoration: "none", fontWeight: "600", marginLeft: "5px" },
  divider: { position: "relative", textAlign: "center", marginBottom: "25px" },
  dividerText: { background: "white", padding: "0 15px", color: "#999", position: "relative", zIndex: 1 },
  googleBtn: { width: "100%", padding: "12px", background: "#4285f4", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "all 0.3s ease" },
  googleIcon: { background: "white", color: "#4285f4", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" },
};

export default LoginPage;

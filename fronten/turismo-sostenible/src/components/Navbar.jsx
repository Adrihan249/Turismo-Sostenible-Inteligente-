// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
        padding: "15px 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "1px",
          }}
        >
          TERRANOVA EXPERIENCE
        </div>

        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "30px",
            margin: 0,
            padding: 0,
          }}
        >
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/quienes-somos" style={linkStyle}>¿Quiénes Somos?</Link></li>
          <li><Link to="/paquetes" style={linkStyle}>Paquetes y Full Days</Link></li>
          <li><Link to="/contacto" style={linkStyle}>Contacto</Link></li>
        </ul>

        {usuario ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ color: "white", fontWeight: "bold" }}>
              Hola, {usuario.nombre}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#FF6B35",
                padding: "10px 20px",
                borderRadius: "25px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link to="/login" style={loginStyle}>
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 500,
  transition: "opacity 0.3s",
};

const loginStyle = {
  background: "white",
  color: "#FF6B35",
  padding: "10px 25px",
  borderRadius: "25px",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "transform 0.3s",
};

export default Navbar;
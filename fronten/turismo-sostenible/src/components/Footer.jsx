import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #003366 0%, #001a33 100%)",
        color: "white",
        padding: "60px 20px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
        }}
      >
        {/* Contacto */}
        <div>
          <h3 style={{ marginBottom: "20px", color: "#FF6B35" }}>CONTÁCTANOS</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li>📞 +51 926 568 799</li>
            <li>📧 terranova58@gmail.com</li>
            <li>📍 Calle 37A No. 52 - 05</li>
          </ul>
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {["f", "📷", "▶"].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#FF6B35",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textDecoration: "none",
                  transition: "background 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#F7931E")}
                onMouseOut={(e) => (e.target.style.background = "#FF6B35")}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Servicios */}
        <div>
          <h3 style={{ marginBottom: "20px", color: "#FF6B35" }}>SERVICIOS</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            {["Hoteles", "Reservaciones", "Tours", "Planificación"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#FF6B35")}
                    onMouseOut={(e) => (e.target.style.color = "white")}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Nosotros */}
        <div>
          <h3 style={{ marginBottom: "20px", color: "#FF6B35" }}>NOSOTROS</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            {[
              "Mesa de servicio",
              "Blog",
              "Quiénes Somos",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#FF6B35")}
                  onMouseOut={(e) => (e.target.style.color = "white")}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Síguenos */}
        <div>
          <h3 style={{ marginBottom: "20px", color: "#FF6B35" }}>SÍGUENOS</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            {["LinkedIn", "Twitter", "Facebook", "Instagram", "YouTube"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#FF6B35")}
                    onMouseOut={(e) => (e.target.style.color = "white")}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          paddingTop: "30px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p>© 2025 Terranova Experience. Todos los derechos reservados.</p>
        <p>Políticas de privacidad</p>
      </div>
    </footer>
  );
};

export default Footer;

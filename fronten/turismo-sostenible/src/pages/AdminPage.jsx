import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [seccion, setSeccion] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [formData, setFormData] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (seccion === "usuarios") fetchUsuarios();
    if (seccion === "paquetes") fetchPaquetes();
    if (seccion === "detalles") fetchDetalles();
  }, [seccion]);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/usuarios");
      setUsuarios(await res.json());
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const fetchPaquetes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/paquetes");
      setPaquetes(await res.json());
    } catch (error) {
      console.error("Error al cargar paquetes:", error);
    }
  };

  const fetchDetalles = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/detalle_paquete");
      setDetalles(await res.json());
    } catch (error) {
      console.error("Error al cargar detalles:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const abrirModalNuevo = () => {
    setFormData({});
    setModoEdicion(false);
    setMostrarModal(true);
  };

  const abrirModalEditar = (item) => {
    setFormData(item);
    setModoEdicion(true);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl =
      seccion === "usuarios"
        ? "http://localhost:8080/api/usuarios"
        : seccion === "paquetes"
        ? "http://localhost:8080/api/paquetes"
        : "http://localhost:8080/api/detalle_paquete";

    const metodo = modoEdicion ? "PUT" : "POST";
    const url = modoEdicion ? `${baseUrl}/${formData.id}` : baseUrl;

    let dataToSend = { ...formData };

    if (seccion === "paquetes") {
      dataToSend.precio = parseFloat(dataToSend.precio);
    }

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
        return;
      }

      alert(modoEdicion ? "Actualizado correctamente" : "Creado correctamente");
      cerrarModal();
      
      if (seccion === "usuarios") fetchUsuarios();
      if (seccion === "paquetes") fetchPaquetes();
      if (seccion === "detalles") fetchDetalles();
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    }
  };

  const eliminarItem = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este elemento?")) return;

    const baseUrl =
      seccion === "usuarios"
        ? "http://localhost:8080/api/usuarios"
        : seccion === "paquetes"
        ? "http://localhost:8080/api/paquetes"
        : "http://localhost:8080/api/detalle_paquete";

    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      alert("Eliminado correctamente");
      
      if (seccion === "usuarios") fetchUsuarios();
      if (seccion === "paquetes") fetchPaquetes();
      if (seccion === "detalles") fetchDetalles();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar");
    }
  };

  const botonEstilo = (activo) => ({
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: activo ? "linear-gradient(135deg, #ff6b35, #f7931e)" : "#f5f5f5",
    color: activo ? "white" : "#333",
    transition: "all 0.3s",
  });

  const renderTabla = () => {
    const items =
      seccion === "usuarios"
        ? usuarios
        : seccion === "paquetes"
        ? paquetes
        : detalles;

    const columnas =
      seccion === "usuarios"
        ? ["ID", "Nombre", "Email", "Rol"]
        : seccion === "paquetes"
        ? ["ID", "Nombre", "Precio", "Región", "Etiqueta"]
        : ["ID", "Descripción", "Video URL"];

    const campos =
      seccion === "usuarios"
        ? ["id", "nombre", "email", "rol"]
        : seccion === "paquetes"
        ? ["id", "nombre", "precio", "region", "etiqueta"]
        : ["id", "descripcionDetallada", "videoUrl"];

    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "10px", overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "linear-gradient(135deg, #0066cc, #42a5f5)", color: "white" }}>
              {columnas.map((c) => (
                <th key={c} style={{ padding: "15px", textAlign: "left", fontWeight: "600" }}>
                  {c}
                </th>
              ))}
              <th style={{ padding: "15px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={columnas.length + 1} style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                  No hay registros disponibles
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee", background: idx % 2 === 0 ? "white" : "#f9f9f9" }}>
                  {campos.map((c) => (
                    <td key={c} style={{ padding: "15px" }}>
                      {c === "precio" ? `S/. ${item[c]}` : 
                       c === "descripcionDetallada" ? (item[c]?.substring(0, 50) + "...") :
                       item[c] || "-"}
                    </td>
                  ))}
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button
                      onClick={() => abrirModalEditar(item)}
                      style={{
                        background: "#4caf50",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        marginRight: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => eliminarItem(item.id)}
                      style={{
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFormulario = () => {
    const campos =
      seccion === "usuarios"
        ? [
            { name: "nombre", label: "Nombre completo", type: "text", required: true },
            { name: "email", label: "Correo electrónico", type: "email", required: true },
            { name: "password", label: "Contraseña", type: "password", required: !modoEdicion },
            { name: "rol", label: "Rol", type: "select", options: ["USER", "ADMIN"], required: true },
          ]
        : seccion === "paquetes"
        ? [
            { name: "nombre", label: "Nombre del paquete", type: "text", required: true },
            { name: "precio", label: "Precio (S/.)", type: "number", required: true },
            { name: "region", label: "Región", type: "text", required: true },
            { name: "etiqueta", label: "Etiqueta", type: "select", options: ["Recomendado", "Nuevo", "Popular", "Oferta"], required: false },
            { name: "imagenPrincipal", label: "URL de imagen principal", type: "text", required: false },
          ]
        : [
            { name: "descripcionDetallada", label: "Descripción detallada", type: "textarea", required: true },
            { name: "incluye", label: "Incluye", type: "textarea", required: false },
            { name: "noIncluye", label: "No incluye", type: "textarea", required: false },
            { name: "importante", label: "Información importante", type: "textarea", required: false },
            { name: "queLlevar", label: "Qué llevar", type: "textarea", required: false },
            { name: "videoUrl", label: "URL del video", type: "text", required: false },
            { name: "imagenSecundaria1", label: "Imagen secundaria 1", type: "text", required: false },
            { name: "imagenSecundaria2", label: "Imagen secundaria 2", type: "text", required: false },
            { name: "imagenSecundaria3", label: "Imagen secundaria 3", type: "text", required: false },
          ];

    return (
      <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "10px" }}>
        {campos.map((campo) => (
          <div key={campo.name} style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#333" }}>
              {campo.label} {campo.required && <span style={{ color: "red" }}>*</span>}
            </label>
            
            {campo.type === "select" ? (
              <select
                name={campo.name}
                value={formData[campo.name] || ""}
                onChange={handleChange}
                required={campo.required}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  fontSize: "1rem",
                  outline: "none",
                }}
              >
                <option value="">Seleccionar...</option>
                {campo.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : campo.type === "textarea" ? (
              <textarea
                name={campo.name}
                value={formData[campo.name] || ""}
                onChange={handleChange}
                required={campo.required}
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            ) : (
              <input
                type={campo.type}
                name={campo.name}
                value={formData[campo.name] || ""}
                onChange={handleChange}
                required={campo.required}
                step={campo.type === "number" ? "0.01" : undefined}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
      <header
        style={{
          background: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button style={botonEstilo(seccion === "usuarios")} onClick={() => setSeccion("usuarios")}>
          👥 Usuarios
        </button>
        <button style={botonEstilo(seccion === "paquetes")} onClick={() => setSeccion("paquetes")}>
          📦 Paquetes
        </button>
        <button style={botonEstilo(seccion === "detalles")} onClick={() => setSeccion("detalles")}>
          📋 Detalles
        </button>
      </header>

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#0066cc", fontSize: "2rem", margin: 0 }}>
            Gestión de {seccion.charAt(0).toUpperCase() + seccion.slice(1)}
          </h2>
          <button
            onClick={abrirModalNuevo}
            style={{
              background: "linear-gradient(135deg, #ff6b35, #f7931e)",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 4px 10px rgba(255,107,53,0.3)",
            }}
          >
            ➕ Nuevo
          </button>
        </div>

        {renderTabla()}
      </main>

      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={cerrarModal}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "90%",
              maxWidth: "600px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "#0066cc", marginBottom: "20px", fontSize: "1.5rem" }}>
              {modoEdicion ? "✏️ Editar" : "➕ Crear"} {seccion.slice(0, -1)}
            </h3>
            
            <form onSubmit={handleSubmit}>
              {renderFormulario()}
              
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #4caf50, #66bb6a)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  {modoEdicion ? "💾 Actualizar" : "✅ Guardar"}
                </button>
                <button
                  type="button"
                  onClick={cerrarModal}
                  style={{
                    flex: 1,
                    background: "#999",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
// src/components/admin/EditZona.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import fondoDecorativo from "../../assets/DonalogoHD.png";

const EditZona = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZona = async () => {
      try {
        const [zonaRes, ubicacionesRes] = await Promise.all([
          fetch(`http://localhost:8000/api/zonas/zonas/${id}/`),
          fetch("http://localhost:8000/api/zonas/ubicaciones/")
        ]);

        if (!zonaRes.ok) throw new Error("Error al cargar zona");

        const zonaData = await zonaRes.json();
        const ubicacionesData = await ubicacionesRes.json();

        setNombre(zonaData.nombre);
        setCiudad(zonaData.ciudad);
        setEstado(zonaData.estado);
        setCodigoPostal(zonaData.codigo_postal);

        const ubicacionZona = ubicacionesData.find(
          (u) => u.zona === zonaData.id
        );
        setDireccion(ubicacionZona?.direccion || "");
      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
        alert("Error al cargar zona");
      } finally {
        setLoading(false);
      }
    };

    fetchZona();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Actualizar zona
      const zonaRes = await fetch(`http://localhost:8000/api/zonas/zonas/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          ciudad,
          estado,
          codigo_postal: codigoPostal
        })
      });

      if (!zonaRes.ok) throw new Error("Error al actualizar zona");

      // Actualizar ubicación asociada
      const ubicacionesRes = await fetch("http://localhost:8000/api/zonas/ubicaciones/");
      const ubicaciones = await ubicacionesRes.json();
      const ubicacion = ubicaciones.find((u) => u.zona === parseInt(id));

      if (ubicacion) {
        await fetch(`http://localhost:8000/api/zonas/ubicaciones/${ubicacion.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            direccion,
            latitud: 0,
            longitud: 0,
            zona: id
          })
        });
      }

      alert("✅ Zona actualizada exitosamente");
      navigate("/zonas");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Ocurrió un error al actualizar la zona.");
    }
  };

  if (loading) return <div className="main-content">⏳ Cargando zona...</div>;

  return (
    <div className="main-content" style={{ position: "relative" }}>
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />
      <h2 className="titulo-principal">✏️ Editar zona</h2>
      <div className="edit-card compacta">
        <form onSubmit={handleSubmit} className="user-form">

          {/* Estado visual (Activo/Inactivo) */}
          <div className="form-group">
            <label>Estado de la zona:</label>
            <select
              value={nombre.toLowerCase().includes("inactiva") ? "inactiva" : "activa"}
              onChange={(e) => {
                const estado = e.target.value;
                setNombre((prev) => {
                  const limpio = prev.replace(/\s*\(inactiva\)/i, "").trim();
                  return estado === "inactiva" ? `${limpio} (INACTIVA)` : limpio;
                });
              }}
            >
              <option value="activa">✅ Activa</option>
              <option value="inactiva">⛔ Inactiva</option>
            </select>
          </div>

          {/* Nombre editable sin sufijo */}
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre.replace(/\s*\(inactiva\)/i, "").trim()}
              onChange={(e) => {
                const limpio = e.target.value;
                setNombre((prev) =>
                  prev.toLowerCase().includes("inactiva")
                    ? `${limpio} (INACTIVA)`
                    : limpio
                );
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>Ciudad:</label>
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Código Postal:</label>
            <input
              type="text"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="guardar-btn">
            <i className="fas fa-save" style={{ color: "white", marginRight: "13px" }}></i>
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditZona;

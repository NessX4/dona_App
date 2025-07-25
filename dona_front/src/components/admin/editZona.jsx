// src/components/admin/EditZona.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import fondoDecorativo from "../../assets/DonalogoHD.png";

const EditZona = () => {
  const { id } = useParams(); // ID de la zona
  const navigate = useNavigate();

  const [zona, setZona] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [ubicacionId, setUbicacionId] = useState(null); // ID de la ubicación asociada

  useEffect(() => {
    // Cargar zona
    fetch(`http://localhost:8000/api/zonas/zonas/${id}/`)
      .then((res) => res.json())
      .then((data) => setZona(data))
      .catch((err) => console.error("Error al cargar zona:", err));

    // Cargar ubicación asociada
    fetch("http://localhost:8000/api/zonas/ubicaciones/")
      .then((res) => res.json())
      .then((data) => {
        const ubicacion = data.find((u) => u.zona === parseInt(id));
        if (ubicacion) {
          setDireccion(ubicacion.direccion);
          setUbicacionId(ubicacion.id);
        }
      })
      .catch((err) => console.error("Error al cargar ubicación:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setZona((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // PATCH a la zona
      const resZona = await fetch(`http://localhost:8000/api/zonas/zonas/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: zona.nombre,
          ciudad: zona.ciudad,
          estado: zona.estado,
          codigo_postal: zona.codigo_postal
        })
      });

      if (!resZona.ok) throw new Error("Error al actualizar la zona");

      // PATCH a la ubicación (si existe)
      if (ubicacionId) {
        const resUbicacion = await fetch(
          `http://localhost:8000/api/zonas/ubicaciones/${ubicacionId}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              direccion,
              latitud: 0,
              longitud: 0
            })
          }
        );

        if (!resUbicacion.ok) throw new Error("Error al actualizar ubicación");
      }

      alert("✅ Zona actualizada correctamente");
      navigate("/zonas");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error al guardar los cambios.");
    }
  };

  if (!zona) return <div className="main-content">Cargando zona...</div>;

  return (
    <div className="main-content" style={{ position: "relative" }}>
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />
      <h2 className="titulo-principal">✏️ Editar Zona</h2>
      <div className="edit-card compacta">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={zona.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ciudad:</label>
            <input
              type="text"
              name="ciudad"
              value={zona.ciudad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <input
              type="text"
              name="estado"
              value={zona.estado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Código Postal:</label>
            <input
              type="text"
              name="codigo_postal"
              value={zona.codigo_postal}
              onChange={handleChange}
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
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditZona;

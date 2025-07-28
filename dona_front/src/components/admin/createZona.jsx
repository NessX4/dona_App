// src/components/admin/CreateZona.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import fondoDecorativo from "../../assets/DonalogoHD.png";

const CreateZona = () => {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const zonaRes = await fetch("http://localhost:8000/api/zonas/zonas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          ciudad,
          estado,
          codigo_postal: codigoPostal
        })
      });

      if (!zonaRes.ok) throw new Error("Error al crear la zona");

      const nuevaZona = await zonaRes.json();

      const ubicacionRes = await fetch("http://localhost:8000/api/zonas/ubicaciones/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direccion,
          latitud: 0,
          longitud: 0,
          zona: nuevaZona.id
        })
      });

      if (!ubicacionRes.ok) throw new Error("Error al crear la ubicación");

      alert("✅ Zona creada exitosamente");
      navigate("/zonas");

    } catch (error) {
      console.error("❌ Error:", error);
      alert("Ocurrió un error al crear la zona.");
    }
  };

  return (
    <div className="main-content" style={{ position: 'relative' }}>
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />
      <h2 className="titulo-principal">➕ Crear nueva zona</h2>
      <div className="edit-card compacta">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
            Guardar Zona
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateZona;

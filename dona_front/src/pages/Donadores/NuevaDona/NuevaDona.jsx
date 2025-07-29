import React, { useState, useEffect } from "react";
import "./NuevaDona.css";
import DonadoresHeader from "../../../components/DonadoresHeader";

const NuevaDona = () => {
  // Obtener fecha hoy en formato YYYY-MM-DD
  const hoy = new Date().toISOString().split("T")[0];

  const [sucursales, setSucursales] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [form, setForm] = useState({
    sucursal: "",
    titulo: "",
    descripcion: "",
    cantidad: "",
    estado: "",
    ubicacion: "",
    zona: "",
    fecha_caducidad: hoy,  // Fecha inicial con valor de hoy
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Cargar sucursales
    fetch("http://127.0.0.1:8000/api/donaciones/sucursales/")
      .then((res) => res.json())
      .then((data) => setSucursales(data.results || data))
      .catch((err) => console.error("Error al cargar sucursales:", err));

    // Cargar zonas desde API
    fetch("http://localhost:8000/api/zonas/zonas/")
      .then((res) => res.json())
      .then((data) => setZonas(data.results || data))
      .catch((err) => console.error("Error al cargar zonas:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaPublicacion = {
      sucursal: parseInt(form.sucursal),
      titulo: form.titulo,
      descripcion: form.descripcion,
      cantidad: parseInt(form.cantidad),
      estado: form.estado,
      ubicacion: form.ubicacion,
      zona: parseInt(form.zona), // asumimos que zona es un id numérico
      fecha_caducidad: form.fecha_caducidad,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaPublicacion),
      });

      if (!response.ok) throw new Error("Error al registrar publicación");

      setMensaje("✅ ¡Publicación registrada exitosamente!");
      setForm({
        sucursal: "",
        titulo: "",
        descripcion: "",
        cantidad: "",
        estado: "",
        ubicacion: "",
        zona: "",
        fecha_caducidad: hoy,  // Reiniciar a fecha actual tras enviar
      });
    } catch (err) {
      setMensaje("❌ Hubo un problema al registrar la publicación.");
    }
  };

  return (
    <>
      <DonadoresHeader />

      <div className="nueva-donacion-container">
        <h2>Agregar Publicación</h2>
        <form onSubmit={handleSubmit}>
          <label>Sucursal:</label>
          <select name="sucursal" value={form.sucursal} onChange={handleChange} required>
            <option value="">Seleccione una sucursal</option>
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>

          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />

          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
          />

          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            min="1"
            required
          />

          <label>Estado:</label>
          <select name="estado" value={form.estado} onChange={handleChange} required>
            <option value="">Seleccione estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
            <option value="Deteriorado">Deteriorado</option>
          </select>

          <label>Ubicación:</label>
          <input
            type="text"
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            required
          />

          <label>Zona:</label>
          <select name="zona" value={form.zona} onChange={handleChange} required>
            <option value="">Seleccione zona</option>
            {zonas.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nombre}
              </option>
            ))}
          </select>

          <label>Fecha caducidad:</label>
          <input
            type="date"
            name="fecha_caducidad"
            value={form.fecha_caducidad}
            onChange={handleChange}
            required
          />

          <button type="submit">Agregar Publicación</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </>
  );
};

export default NuevaDona;

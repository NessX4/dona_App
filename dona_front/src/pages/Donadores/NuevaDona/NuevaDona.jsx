// Luna Flores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import "./NuevaDona.css";
import DonadoresHeader from "../../../components/DonadoresHeader";

const NuevaDona = () => {
  const hoy = new Date().toISOString().split("T")[0];

  const [sucursales, setSucursales] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

  const [form, setForm] = useState({
    sucursal: "",
    titulo: "",
    descripcion: "",
    cantidad: "",
    estado: "",
    ubicacion: "",
    zona: "",
    fecha_caducidad: hoy,
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donaciones/sucursales/")
      .then((res) => res.json())
      .then((data) => setSucursales(data.results || data))
      .catch((err) => console.error("Error al cargar sucursales:", err));

    fetch("http://127.0.0.1:8000/api/zonas/zonas/")
      .then((res) => res.json())
      .then((data) => setZonas(data.results || data))
      .catch((err) => console.error("Error al cargar zonas:", err));

    fetch("http://127.0.0.1:8000/api/donaciones/estados/")
      .then((res) => res.json())
      .then((data) => setEstados(data.results || data))
      .catch((err) => console.error("Error al cargar estados:", err));

    fetch("http://127.0.0.1:8000/api/zonas/ubicaciones/")
      .then((res) => res.json())
      .then((data) => setUbicaciones(data.results || data))
      .catch((err) => console.error("Error al cargar ubicaciones:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

const nuevaPublicacion = {
  titulo: form.titulo,
  descripcion: form.descripcion,
  cantidad: parseInt(form.cantidad),
  fecha_caducidad: form.fecha_caducidad,
  estado: parseInt(form.estado),       // sin _id
  ubicacion: parseInt(form.ubicacion), // sin _id
  zona: parseInt(form.zona),           // sin _id
  sucursal: parseInt(form.sucursal),   // sin _id
};


  try {
    const response = await fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaPublicacion),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al registrar publicación:", errorData);
      setMensaje("Error: " + JSON.stringify(errorData));
      return;
    }

    setMensaje("¡Publicación registrada exitosamente!");
    setForm({
      sucursal: "",
      titulo: "",
      descripcion: "",
      cantidad: "",
      estado: "",
      ubicacion: "",
      zona: "",
      fecha_caducidad: hoy,
    });
  } catch (err) {
    console.error("Error en catch:", err);
    setMensaje("Hubo un problema al registrar la publicación.");
  }
};


  return (
    <>
      <DonadoresHeader />

      <div className="nueva-donacion-container">
        <h2>Agregar Publicación</h2>
        <form onSubmit={handleSubmit}>
          <label>Sucursal:</label>
          <select
            name="sucursal"
            value={form.sucursal}
            onChange={handleChange}
            required
          >
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
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione estado</option>
            {estados.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>

          <label>Ubicación:</label>
          <select
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione ubicación</option>
            {ubicaciones.map((u) => (
              <option key={u.id} value={u.id}>
                {u.direccion}
              </option>
            ))}
          </select>

          <label>Zona:</label>
          <select
            name="zona"
            value={form.zona}
            onChange={handleChange}
            required
          >
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

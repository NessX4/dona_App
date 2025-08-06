// Luna Flores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import "./NuevaSucursal.css";

const NuevaSucursal = ({ donadorId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    horario_apertura: "",
    horario_cierre: "",
    representante: "",
    zona: "",
    ubicacion: "",
  });

  const [zonas, setZonas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarZonas = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/zonas/zonas/");
        if (!res.ok) throw new Error("Error al cargar zonas");
        const data = await res.json();
        setZonas(data);
      } catch (err) {
        console.error(err);
      }
    };

    const cargarUbicaciones = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/zonas/ubicaciones/");
        if (!res.ok) throw new Error("Error al cargar ubicaciones");
        const data = await res.json();
        setUbicaciones(data);
      } catch (err) {
        console.error(err);
      }
    };

    cargarZonas();
    cargarUbicaciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    if (!formData.zona || !formData.ubicacion) {
      setError("Por favor selecciona zona y ubicación");
      setGuardando(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/donaciones/sucursales/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          zona: parseInt(formData.zona),
          ubicacion: parseInt(formData.ubicacion),
          donador: parseInt(donadorId),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al crear la sucursal");
      }

      const nuevaSucursal = await response.json();
      setGuardando(false);
      onSuccess(nuevaSucursal);
    } catch (err) {
      setError(err.message || "Error inesperado");
      setGuardando(false);
    }
  };

  return (
    <div className="NuevaSucursal-container">
      <h3>Nueva sucursal</h3>
      <form onSubmit={handleSubmit} className="NuevaSucursal-form">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            autoFocus
          />
        </label>

        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </label>

        <label>
          Horario Apertura:
          <input
            type="time"
            name="horario_apertura"
            value={formData.horario_apertura}
            onChange={handleChange}
          />
        </label>

        <label>
          Horario Cierre:
          <input
            type="time"
            name="horario_cierre"
            value={formData.horario_cierre}
            onChange={handleChange}
          />
        </label>

        <label>
          Representante:
          <input
            type="text"
            name="representante"
            value={formData.representante}
            onChange={handleChange}
          />
        </label>

        <label>
          Zona:
          <select
            name="zona"
            value={formData.zona}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una zona</option>
            {zonas.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nombre || `Zona ${z.id}`}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ubicación:
          <select
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una ubicación</option>
            {ubicaciones.map((u) => (
              <option key={u.id} value={u.id}>
                {u.direccion || `Ubicación ${u.id}`}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="NuevaSucursal-error">Error: {error}</p>}

        <div className="NuevaSucursal-buttons">
          <button
            type="button"
            className="CancelarNuevaSucursalDona"
            onClick={onCancel}
            disabled={guardando}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="CrearNuevaSucursalDona"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaSucursal;

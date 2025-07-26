import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import fondoDecorativo from "../../assets/DonalogoHD.png";

const CreateSucursal = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    representante: "",
    horario_apertura: "",
    horario_cierre: "",
    zona: "",
    donador: "",
    ubicacion: "",
  });

  const [zonas, setZonas] = useState([]);
  const [donadores, setDonadores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zonasRes, donadoresRes, ubicacionesRes] = await Promise.all([
          fetch("http://localhost:8000/api/zonas/zonas/"),
          fetch("http://localhost:8000/api/usuarios/donadores/"),
          fetch("http://localhost:8000/api/zonas/ubicaciones/"),
        ]);

        const zonasData = await zonasRes.json();
        setZonas(zonasData.filter(z => !z.nombre.toLowerCase().includes("inactiva")));


        setDonadores(await donadoresRes.json());
        setUbicaciones(await ubicacionesRes.json());
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaSucursal = {
      ...formData,
      zona: parseInt(formData.zona),
      donador: parseInt(formData.donador),
      ubicacion: parseInt(formData.ubicacion),
    };

    try {
      const res = await fetch("http://localhost:8000/api/donaciones/sucursales/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaSucursal),
      });

      if (res.ok) {
        alert("✅ Sucursal creada con éxito");
        navigate("/sucursales");
      } else {
        const error = await res.json();
        console.error("❌ Error en la creación:", error);
        alert("❌ Error al crear la sucursal");
      }
    } catch (err) {
      alert("❌ Error inesperado: " + err.message);
    }
  };

  return (
    <div className="main-content" style={{ position: 'relative' }}>
      <img src={fondoDecorativo} alt="Decoración" className="decorative-image" />
      <h2 className="titulo-principal">➕ Crear nueva sucursal</h2>

      <div className="edit-card compacta">
        <form onSubmit={handleSubmit} className="user-form">

          <div className="form-group">
            <label>Nombre:</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Dirección:</label>
            <input name="direccion" value={formData.direccion} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input name="telefono" value={formData.telefono} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Representante:</label>
            <input name="representante" value={formData.representante} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Horario de apertura:</label>
            <input type="time" name="horario_apertura" value={formData.horario_apertura} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Horario de cierre:</label>
            <input type="time" name="horario_cierre" value={formData.horario_cierre} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Zona:</label>
            <select name="zona" value={formData.zona} onChange={handleChange} required>
              <option value="">Selecciona una zona</option>
              {zonas.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.nombre} ({z.codigo_postal})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Ubicación:</label>
            <select name="ubicacion" value={formData.ubicacion} onChange={handleChange} required>
              <option value="">Selecciona una ubicación</option>
              {ubicaciones.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.direccion}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Donador:</label>
            <select name="donador" value={formData.donador} onChange={handleChange} required>
              <option value="">Selecciona un donador</option>
              {donadores.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre_lugar} ({d.usuario?.nombre})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="guardar-btn">
            <i className="fas fa-save" style={{ color: 'white', marginRight: '13px' }}></i>
            Crear Sucursal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSucursal;

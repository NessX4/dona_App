import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/admin.css";
import fondoDecorativo from "../../assets/donalogohd.png";

const EditSucursal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sucursal, setSucursal] = useState(null);
  const [zonas, setZonas] = useState([]);
  const [donadores, setDonadores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

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
    estatus: "activo", // 🔥 nuevo campo
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sucursalRes, zonasRes, donadoresRes, ubicacionesRes] = await Promise.all([
          fetch(`http://localhost:8000/api/donaciones/sucursales/${id}/`),
          fetch("http://localhost:8000/api/zonas/zonas/"),
          fetch("http://localhost:8000/api/usuarios/donadores/"),
          fetch("http://localhost:8000/api/zonas/ubicaciones/"),
        ]);

        const sucursalData = await sucursalRes.json();
        const zonasData = await zonasRes.json();
        const donadoresData = await donadoresRes.json();
        const ubicacionesData = await ubicacionesRes.json();

        setSucursal(sucursalData);
        setZonas(zonasData.filter(z => !z.nombre.toLowerCase().includes("inactiva")));
        setDonadores(donadoresData);
        setUbicaciones(ubicacionesData);

        // 🧠 Inicializa los datos y limpia "(inactiva)" del nombre
        setFormData({
          nombre: sucursalData.nombre.replace(/ *\(?inactiva\)?/i, "").trim(),
          direccion: sucursalData.direccion,
          telefono: sucursalData.telefono,
          representante: sucursalData.representante,
          horario_apertura: sucursalData.horario_apertura,
          horario_cierre: sucursalData.horario_cierre,
          zona: sucursalData.zona,
          donador: sucursalData.donador,
          ubicacion: sucursalData.ubicacion,
          estatus: sucursalData.nombre.toLowerCase().includes("inactiva") ? "inactivo" : "activo",
        });
      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔄 Ajusta el nombre según estatus
    let nombreFinal = formData.nombre.trim();
    if (formData.estatus === "inactivo" && !nombreFinal.toLowerCase().includes("inactiva")) {
      nombreFinal += " (inactiva)";
    } else if (formData.estatus === "activo") {
      nombreFinal = nombreFinal.replace(/ *\(?inactiva\)?/i, "").trim();
    }

    const payload = {
      ...formData,
      nombre: nombreFinal,
      zona: parseInt(formData.zona),
      donador: parseInt(formData.donador),
      ubicacion: parseInt(formData.ubicacion),
    };

    try {
      const res = await fetch(`http://localhost:8000/api/donaciones/sucursales/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Sucursal actualizada correctamente");
        navigate("/sucursales");
      } else {
        const errorData = await res.json();
        console.error("❌ Error al actualizar:", errorData);
        alert("Error al actualizar la sucursal");
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      alert("Error al actualizar la sucursal");
    }
  };

  const handleCancel = () => {
    navigate("/sucursales");
  };

  if (!sucursal) return <div className="main-content">⏳ Cargando datos de la sucursal...</div>;

  return (
    <div className="main-content">
      <img src={fondoDecorativo} alt="Decoración" className="decorative-image" />
      <h2 className="titulo-principal">✏️ Editar sucursal</h2>

      <div className="edit-card compacta">
        <form className="user-form" onSubmit={handleSubmit}>
              <div className="form-group">
            <label>Estatus:</label>
            <select name="estatus" value={formData.estatus} onChange={handleChange}>
              <option value="activo">✅ Activo</option>
              <option value="inactivo">⛔ Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Dirección:</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Representante:</label>
            <input type="text" name="representante" value={formData.representante} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Horario de apertura:</label>
            <input type="time" name="horario_apertura" value={formData.horario_apertura} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Horario de cierre:</label>
            <input type="time" name="horario_cierre" value={formData.horario_cierre} onChange={handleChange} />
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

          {/* 🔥 Estatus editable */}
        

          <div className="form-buttons">
            <button type="submit" className="guardar-btn">
              <i className="fas fa-save" style={{ marginRight: '12px' }}></i>Guardar cambios
            </button>
            <button type="button" className="cancelar-btn" onClick={handleCancel}>
              <i className="fas fa-times-circle" style={{ marginRight: '6px' }}></i>Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSucursal;

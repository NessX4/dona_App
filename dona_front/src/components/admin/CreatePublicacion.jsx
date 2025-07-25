import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePublicacion = () => {
  const navigate = useNavigate();
  const [sucursales, setSucursales] = useState([]);
  const [zonas, setZonas] = useState([]);

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    cantidad: '',
    fecha_caducidad: '',
    sucursal: '',
    zona: '',
    estado: 1 // activa por defecto
  });

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const [sucursalesRes, zonasRes] = await Promise.all([
          fetch('http://localhost:8000/api/donaciones/sucursales/'),
          fetch('http://localhost:8000/api/zonas/zonas/')
        ]);

        setSucursales(await sucursalesRes.json());
        setZonas(await zonasRes.json());
      } catch (err) {
        console.error('Error al cargar sucursales o zonas:', err);
      }
    };
    fetchOpciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/donaciones/publicaciones/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('✅ Publicación creada con éxito');
        navigate('/publicaciones');
      } else {
        const errorData = await res.json();
        console.error('Error:', errorData);
        alert('❌ Error al crear la publicación');
      }
    } catch (err) {
      console.error('Error de red:', err);
      alert('❌ Error de red');
    }
  };

  return (
    <div className="main-content">
      <h2 className="titulo-principal">📝 Crear Nueva Publicación</h2>
      <div className="edit-card compacta">
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" required />
          </div>

          <div className="form-group">
            <label>Cantidad:</label>
            <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Fecha de caducidad:</label>
            <input type="date" name="fecha_caducidad" value={formData.fecha_caducidad} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Sucursal:</label>
            <select name="sucursal" value={formData.sucursal} onChange={handleChange} required>
              <option value="">-- Selecciona una sucursal --</option>
              {sucursales.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Zona:</label>
            <select name="zona" value={formData.zona} onChange={handleChange} required>
              <option value="">-- Selecciona una zona --</option>
              {zonas.map(z => (
                <option key={z.id} value={z.id}>{z.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value={1}>Activa</option>
              <option value={0}>Inactiva</option>
            </select>
          </div>

          <button type="submit" className="guardar-btn">💾 Guardar Publicación</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePublicacion;
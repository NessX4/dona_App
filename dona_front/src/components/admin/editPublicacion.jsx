// src/components/admin/EditPublicacion.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fondoDecorativo from '../../assets/DonalogoHD.png';
import '../../styles/admin.css';

const EditPublicacion = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [estadosDonacion, setEstadosDonacion] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [publiRes, sucursalesRes, zonasRes, estadosRes] = await Promise.all([
          fetch(`http://localhost:8000/api/donaciones/publicaciones/${id}/`),
          fetch('http://localhost:8000/api/donaciones/sucursales/'),
          fetch('http://localhost:8000/api/zonas/zonas/'),
          fetch('http://localhost:8000/api/donaciones/estados/')
        ]);

        const publiData = await publiRes.json();
        const sucursalData = await sucursalesRes.json();
        const zonasData = await zonasRes.json();
        const estadosData = await estadosRes.json();

        setPublicacion({
          ...publiData,
          estado: publiData.estado?.id || publiData.estado || ''
        });
        setSucursales(sucursalData);
        setZonas(zonasData);
        setEstadosDonacion(estadosData);
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'sucursal') {
      const sucursalSeleccionada = sucursales.find(s => s.id === parseInt(value));
      const ubicacionId = sucursalSeleccionada?.ubicacion || null;
      setPublicacion(prev => ({
        ...prev,
        sucursal: parseInt(value),
        ubicacion: ubicacionId
      }));
    } else if (['zona', 'cantidad', 'estado'].includes(name)) {
      setPublicacion(prev => ({
        ...prev,
        [name]: parseInt(value)
      }));
    } else {
      setPublicacion(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/donaciones/publicaciones/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publicacion)
      });

      if (res.ok) {
        alert('✅ Publicación actualizada correctamente.');
        window.location.href = '/admin/#/publicaciones';
      } else {
        const data = await res.json();
        console.error('❌ Error al guardar:', data);
        alert('❌ Error al guardar los cambios.');
      }
    } catch (error) {
      console.error('❌ Error de red al guardar:', error);
      alert('❌ Error de red al guardar.');
    }
  };

  const handleCancel = () => {
    window.location.href = '/admin/#/publicaciones';
  };

  if (!publicacion) return <div className="main-content">⏳ Cargando publicación...</div>;

  return (
    <div className="main-content">
      <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
      <h2 className="titulo-principal">✏️ Editar publicación</h2>

      <div className="edit-card compacta">
        <form className="user-form">
          <div className="form-group">
            <label>Título:</label>
            <input name="titulo" value={publicacion.titulo} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <input name="descripcion" value={publicacion.descripcion} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Cantidad:</label>
            <input type="number" name="cantidad" value={publicacion.cantidad} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Fecha de caducidad:</label>
            <input type="date" name="fecha_caducidad" value={publicacion.fecha_caducidad} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Sucursal:</label>
            <select name="sucursal" value={publicacion.sucursal} onChange={handleChange}>
              <option value="">Selecciona una sucursal</option>
              {sucursales.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Zona:</label>
            <select name="zona" value={publicacion.zona} onChange={handleChange}>
              <option value="">Selecciona una zona</option>
              {zonas.map(z => (
                <option key={z.id} value={z.id}>{z.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <select name="estado" value={publicacion.estado} onChange={handleChange}>
              <option value="">Selecciona un estado</option>
              {estadosDonacion.map(e => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-buttons">
            <button type="button" className="guardar-btn" onClick={handleSave}>
              <i className="fas fa-save" style={{ marginRight: '12px' }}></i>Guardar cambios
            </button>
            <button type="button" className="cancelar-btn" onClick={handleCancel}>
              <i className="fas fa-times-circle" style={{ marginRight: '4px' }}></i>Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPublicacion;

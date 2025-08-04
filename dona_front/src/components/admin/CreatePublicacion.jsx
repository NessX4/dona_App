/**
 * Responsable: Mariela Higuera
 * Descripción: Formulario para registrar una nueva publicación de donación.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import fondoDecorativo from '../../assets/DonalogoHD.png';
import '../../styles/admin.css';

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
    ubicacion: '',
    estado: 1  // Valor por defecto, activo
  });

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const [sucursalesRes, zonasRes] = await Promise.all([
          fetch('http://localhost:8000/api/donaciones/sucursales/'),
          fetch('http://localhost:8000/api/zonas/zonas/')
        ]);

        const sucursalesData = await sucursalesRes.json();
        const zonasData = await zonasRes.json();

        // FILTRAR SUCURSALES Y ZONAS QUE NO DIGAN 'inactiva' en el nombre
        setSucursales(
          sucursalesData.filter(s => !s.nombre.toLowerCase().includes('inactiva'))
        );
        setZonas(
          zonasData.filter(z => !z.nombre.toLowerCase().includes('inactiva'))
        );
      } catch (err) {
        console.error('Error al cargar sucursales o zonas:', err);
      }
    };
    fetchOpciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'sucursal') {
      const sucursalSeleccionada = sucursales.find(s => s.id === parseInt(value));
      const ubicacionId = sucursalSeleccionada?.ubicacion || null;

      setFormData(prev => ({
        ...prev,
        sucursal: parseInt(value),
        ubicacion: ubicacionId
      }));
    } else if (name === 'zona' || name === 'cantidad') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
        alert(`¡Publicación creada con éxito!`);
        window.location.href = '/admin/#/publicaciones';
      } else {
        const errorData = await res.json();
        console.error('❌ Error en POST:', errorData);
        alert('❌ Error al crear la publicación');
      }
    } catch (err) {
      console.error('Error de red:', err);
      alert('❌ Error de red');
    }
  };

  return (
    <div className="main-content">
      <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
      <h2 className="titulo-principal">📝 Crear nueva publicación</h2>
      <div className="edit-card compacta">
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
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

          <button type="submit" className="guardar-btn">
            <i className="fas fa-save" style={{ color: 'white', marginRight: '14px' }}></i>
            Crear publicación
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePublicacion;

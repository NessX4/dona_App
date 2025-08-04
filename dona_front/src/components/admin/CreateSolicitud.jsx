/**
 * Responsable: Mariela Higuera
 * Descripción: Formulario para crear una nueva solicitud de donación.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import fondoDecorativo from '../../assets/DonalogoHD.png';
import '../../styles/admin.css';

const CreateSolicitud = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [receptores, setReceptores] = useState([]);

  const [formData, setFormData] = useState({
    publicacion: '',
    receptor: '',
    comentarios: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pubRes, recRes] = await Promise.all([
          fetch('http://localhost:8000/api/donaciones/publicaciones/'),
          fetch('http://localhost:8000/api/usuarios/receptores/')
        ]);
        setPublicaciones(await pubRes.json());
        setReceptores(await recRes.json());
      } catch (error) {
        console.error('❌ Error cargando publicaciones o receptores:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      estado: 1  // estado por defecto: 'Disponible'
    };

    try {
      const res = await fetch('http://localhost:8000/api/solicitudes/solicitudes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Error al crear la solicitud');

      alert('✅ Solicitud creada con éxito');
      navigate('/solicitudes');
    } catch (error) {
      console.error('❌ Error al crear la solicitud:', error);
      alert('❌ No se pudo crear la solicitud');
    }
  };

  return (
    <div className="main-content">
      <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
      <h2 className="titulo-principal">Crear nueva solicitud</h2>
      <div className="edit-card compacta">
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Publicación:</label>
            <select name="publicacion" value={formData.publicacion} onChange={handleChange} required>
              <option value="">-- Selecciona una publicación --</option>
              {publicaciones.map(pub => (
                <option key={pub.id} value={pub.id}>
                  {pub.titulo} - ({pub.cantidad} unidades)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Receptor:</label>
            <select name="receptor" value={formData.receptor} onChange={handleChange} required>
              <option value="">-- Selecciona un receptor --</option>
              {receptores.map(rec => (
                <option key={rec.id} value={rec.id}>
                  {rec.nombre_lugar} - {rec.encargado}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Comentarios:</label>
            <input
              type="text"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Agrega algún comentario (opcional)..."
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="guardar-btn">Guardar solicitud</button>
            <button type="button" className="cancelar-btn" onClick={() => navigate('/solicitudes')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSolicitud;

/**
 * Responsable: Mariela Higuera
 * Descripción: Permite modificar los datos de una solicitud ya existente en el sistema.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import fondoDecorativo from '../../assets/DonalogoHD.png';
import '../../styles/admin.css';

const EditSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [publicaciones, setPublicaciones] = useState([]);
  const [receptores, setReceptores] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estadosDonacion, setEstadosDonacion] = useState([]);
  const [publicacionCompleta, setPublicacionCompleta] = useState(null);

  const [formData, setFormData] = useState({
    publicacion: '',
    receptor: '',
    comentarios: '',
    estado: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solRes, pubRes, recRes, sucRes, estadosRes] = await Promise.all([
          fetch(`http://localhost:8000/api/solicitudes/solicitudes/${id}/`),
          fetch('http://localhost:8000/api/donaciones/publicaciones/'),
          fetch('http://localhost:8000/api/usuarios/receptores/'),
          fetch('http://localhost:8000/api/donaciones/sucursales/'),
          fetch('http://localhost:8000/api/donaciones/estados/')
        ]);

        const solicitud = await solRes.json();
        const allPubs = await pubRes.json();
        const allSucs = await sucRes.json();

        const pubSeleccionada = allPubs.find(p => p.id === solicitud.publicacion);

        setFormData({
          publicacion: solicitud.publicacion || '',
          receptor: solicitud.receptor || '',
          comentarios: solicitud.comentarios || '',
          estado: solicitud.estado?.id || solicitud.estado || ''
        });

        setPublicaciones(allPubs);
        setSucursales(allSucs);
        setReceptores(await recRes.json());
        setEstadosDonacion(await estadosRes.json());
        setPublicacionCompleta(pubSeleccionada);
      } catch (error) {
        console.error('❌ Error cargando datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const getSucursalInfo = () => {
    if (!publicacionCompleta || !publicacionCompleta.sucursal) return null;
    return sucursales.find(s => s.id === publicacionCompleta.sucursal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };




const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // PATCH de la solicitud
    const res = await fetch(`http://localhost:8000/api/solicitudes/solicitudes/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error('Error al actualizar la solicitud');

    // 🔍 Extraer datos necesarios para el historial
    const sucursal = sucursales.find(s => s.id === publicacionCompleta?.sucursal);
    const donadorId = sucursal?.donador;

    // ⚠️ Validaciones mínimas
    if (!formData.publicacion || !formData.receptor || !donadorId) {
      console.error('❌ Faltan datos requeridos para historial');
      alert('❌ No se pudo registrar en historial: datos incompletos');
      return;
    }

    // 📝 Crear el payload simple
    const historialPayload = {
      tipo: 'Actualizaciones',
      publicacion: parseInt(formData.publicacion),
      receptor: parseInt(formData.receptor),
      donador: donadorId
    };

    // 🌐 POST al historial
    const histRes = await fetch('http://localhost:8000/api/solicitudes/historiales/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(historialPayload)
    });

    if (!histRes.ok) {
      const errorData = await histRes.json();
      console.error('❌ Error al guardar historial:', errorData);
      alert('❌ Falló el registro del historial');
      return;
    }

    alert('✅ Solicitud actualizada con éxito');
    navigate('/solicitudes');
  } catch (error) {
    console.error('❌ Error general en edición:', error);
    alert('❌ No se pudo actualizar la solicitud');
  }
};







  const sucursalInfo = getSucursalInfo();

  return (
    <div className="main-content">
      <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
      <h2 className="titulo-principal">Editar solicitud</h2>
      <div className="edit-card compacta">
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Publicación:</label>
            <select name="publicacion" value={formData.publicacion} onChange={handleChange} required disabled>
              <option value="">-- Selecciona una publicación --</option>
              {publicaciones.map(pub => (
                <option key={pub.id} value={pub.id}>
                  {pub.titulo} - ({pub.cantidad} unidades)
                </option>
              ))}
            </select>
          </div>

          {publicacionCompleta && (
            <>
              <div className="form-group">
                <label>Descripción:</label>
                <input
                  type="text"
                  value={publicacionCompleta.descripcion || 'Sin descripción'}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Sucursal:</label>
                <input
                  type="text"
                  value={
                    sucursalInfo
                      ? `${sucursalInfo.nombre} - ${sucursalInfo.direccion}`
                      : 'Sucursal no encontrada'
                  }
                  disabled
                />
              </div>
            </>
          )}

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
            <label>Estado:</label>
            <select name="estado" value={formData.estado} onChange={handleChange} required>
              <option value="">-- Selecciona un estado --</option>
              {estadosDonacion.map(est => (
                <option key={est.id} value={est.id}>
                  {est.nombre}
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
            <button type="submit" className="guardar-btn">Guardar cambios</button>
            <button type="button" className="cancelar-btn" onClick={() => navigate('/solicitudes')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSolicitud;

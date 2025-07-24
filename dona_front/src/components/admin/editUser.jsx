import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/admin.css';
import fondoDecorativo from '../../assets/donalogohd.png';

const ROLES_MAP = {
  1: 'Donador',
  2: 'Receptor',
  3: 'Voluntario',
  4: 'Administrador',
};

const formatFecha = (fechaStr) => {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const EditUser = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [datosRol, setDatosRol] = useState(null);
  const [zonas, setZonas] = useState([]);

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/zonas/zonas/');
        const data = await res.json();
        setZonas(data);
      } catch (err) {
        console.error('Error al cargar zonas:', err);
      }
    };

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/usuarios/usuarios/${id}/`);
        const data = await res.json();
        setUsuario(data);

        let endpoint = '';
        switch (data.rol) {
          case 1: endpoint = 'donadores'; break;
          case 2: endpoint = 'receptores'; break;
          case 3: endpoint = 'voluntarios'; break;
          case 4: endpoint = 'administradores'; break;
          default: return;
        }

        const resRol = await fetch(`http://127.0.0.1:8000/api/usuarios/${endpoint}/?usuario=${id}`);
        const dataRol = await resRol.json();

        if (Array.isArray(dataRol) && dataRol.length > 0) {
  const entidadCorrecta = dataRol.find(item => item.usuario?.id === parseInt(id));
  setDatosRol(entidadCorrecta);
}

      } catch (error) {
        console.error('❌ Error al obtener datos del usuario:', error);
      }
    };

    fetchZonas();
    fetchUsuario();
  }, [id]);

  const handleChange = (e, tipo = 'usuario') => {
    const { name, value } = e.target;
    if (tipo === 'usuario') {
      setUsuario(prev => ({ ...prev, [name]: value }));
    } else {
      setDatosRol(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => {
    window.location.href = '/admin/#/usuarios';
  };

  if (!usuario || !datosRol) {
    return <div className="main-content">⏳ Cargando datos del usuario...</div>;
  }

  return (
    <div className="main-content">
      <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
      <h2>✏️ Editar Usuario</h2>

      <div className="edit-card">
        <form className="user-form">
          <div className="info-box">
            <div><span className="info-label">📌 Rol:</span> {ROLES_MAP[usuario.rol]}</div>
            <div><span className="info-label">✅ Estado:</span> {usuario.activo ? 'Activo' : 'Inactivo'}</div>
            <div><span className="info-label">🗓️ Fecha de registro:</span> {formatFecha(usuario.fecha_registro)}</div>
          </div>

          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Correo:</label>
            <input type="email" name="correo" value={usuario.correo} onChange={handleChange} />
          </div>

          {/* Donador */}
          {usuario.rol === 1 && (
            <>
              <div className="form-group"><label>Nombre del lugar:</label><input name="nombre_lugar" value={datosRol.nombre_lugar || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Representante:</label><input name="representante" value={datosRol.representante || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Teléfono:</label><input name="telefono" value={datosRol.telefono || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Descripción:</label><input name="descripcion" value={datosRol.descripcion || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Horario de apertura:</label>
                <input type="time" name="horario_apertura" value={datosRol.horario_apertura?.slice(0, 5) || ''} onChange={(e) => handleChange(e, 'rol')} />
              </div>
              <div className="form-group"><label>Horario de cierre:</label>
                <input type="time" name="horario_cierre" value={datosRol.horario_cierre?.slice(0, 5) || ''} onChange={(e) => handleChange(e, 'rol')} />
              </div>
            </>
          )}

          {/* Receptor */}
          {usuario.rol === 2 && (
            <>
              <div className="form-group"><label>Encargado:</label><input name="encargado" value={datosRol.encargado || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Dirección:</label><input name="direccion" value={datosRol.direccion || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Teléfono:</label><input name="telefono" value={datosRol.telefono || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Capacidad:</label><input name="capacidad" type="number" value={datosRol.capacidad || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Horario de apertura:</label>
                <input type="time" name="horario_apertura" value={datosRol.horario_apertura?.slice(0, 5) || ''} onChange={(e) => handleChange(e, 'rol')} />
              </div>
              <div className="form-group"><label>Horario de cierre:</label>
                <input type="time" name="horario_cierre" value={datosRol.horario_cierre?.slice(0, 5) || ''} onChange={(e) => handleChange(e, 'rol')} />
              </div>
            </>
          )}

          {/* Voluntario */}
          {usuario.rol === 3 && (
            <>
              <div className="form-group"><label>Teléfono:</label><input name="telefono" value={datosRol.telefono || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group">
                <label>Zona asignada:</label>
                <select name="zona" value={datosRol.zona || ''} onChange={(e) => handleChange(e, 'rol')}>
                  <option value="">Selecciona una zona</option>
                  {zonas.map((z) => (
                    <option key={z.id} value={z.id}>{z.nombre} ({z.codigo_postal})</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="form-buttons">
<button type="button" className="guardar-btn">
  <i className="fas fa-save" style={{ marginRight: '12px' }}></i>
  Guardar cambios
</button>



  <button type="button" className="cancelar-btn" onClick={handleCancel}>
    <i className="fas fa-times-circle"style={{ marginRight: '4px' }}></i> Cancelar
  </button>
</div>
</form>
      </div>
    </div>
  );
};

export default EditUser;

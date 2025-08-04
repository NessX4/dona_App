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
    const zonasActivas = data.filter(z => !z.nombre.toLowerCase().includes('inactiva'));
    setZonas(zonasActivas);
  } catch (err) {
    console.error('Error al cargar zonas:', err);
  }
};

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/usuarios/usuarios/${id}/`);
        const data = await res.json();
        setUsuario(data);

        const endpointMap = {
          1: 'donadores',
          2: 'receptores',
          3: 'voluntarios',
          4: 'administradores',
        };

        const endpoint = endpointMap[data.rol];
        const resRol = await fetch(`http://127.0.0.1:8000/api/usuarios/${endpoint}/`);
        const dataRol = await resRol.json();

        // 👉 Solución robusta: maneja usuario como objeto, número o null
        const entidadCorrecta = dataRol.find(item => {
          if (typeof item.usuario === 'object' && item.usuario !== null && 'id' in item.usuario) {
            return parseInt(item.usuario.id) === parseInt(id);
          }
          if (typeof item.usuario === 'number') {
            return parseInt(item.usuario) === parseInt(id);
          }
          return false;
        });

        if (!entidadCorrecta) {
          alert('⚠️ Este usuario no tiene entidad activa o válida.');
          window.location.href = '/admin/#/usuarios';
          return;
        }

        setDatosRol(entidadCorrecta);
      } catch (err) {
        console.error('❌ Error al obtener datos del usuario:', err);
        alert('❌ Ocurrió un error al cargar el usuario.');
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

  const handleSave = async () => {
    const rolMap = {
      1: 'donadores',
      2: 'receptores',
      3: 'voluntarios',
      4: 'administradores',
    };

    try {
      if (datosRol?.id) {
        const entidadPayload = { ...datosRol };
        delete entidadPayload.usuario;

        await fetch(`http://127.0.0.1:8000/api/usuarios/${rolMap[usuario.rol]}/${datosRol.id}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entidadPayload),
        });
      }

      await fetch(`http://127.0.0.1:8000/api/usuarios/usuarios/${usuario.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activo: usuario.activo }),
      });

      alert('✅ Cambios guardados correctamente.');
      window.location.href = '/admin/#/usuarios';
    } catch (err) {
      console.error('Error al guardar cambios:', err);
      alert('❌ Error al guardar los cambios.');
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
      <h2 className="titulo-principal">✏️ Editar usuario</h2>

      <div className="rol-destacado">{ROLES_MAP[usuario.rol]}</div>

      <div className="edit-card compacta">
        <form className="user-form">

          <div className="info-box">
            <div><span className="info-label"><i className="fas fa-envelope info-icon"></i> Correo:</span> {usuario.correo}</div>
            <div><span className="info-label"><i className="fas fa-user info-icon"></i> Nombre:</span> {usuario.nombre}</div>
            <div><span className="info-label"><i className="fas fa-calendar-alt info-icon"></i> Fecha de registro:</span> {formatFecha(usuario.fecha_registro)}</div>
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <select
              name="activo"
              value={usuario.activo ? 'true' : 'false'}
              onChange={(e) =>
                handleChange({ target: { name: 'activo', value: e.target.value === 'true' } })
              }
            >
              <option value="true">✅ Activo</option>
              <option value="false">⛔ Inactivo</option>
            </select>
          </div>

          {/* === CAMPOS SEGÚN ROL === */}
          {usuario.rol === 1 && (
            <>
              <div className="form-group"><label>Teléfono:</label><input name="telefono" value={datosRol.telefono || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Nombre del lugar:</label><input name="nombre_lugar" value={datosRol.nombre_lugar || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Representante:</label><input name="representante" value={datosRol.representante || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Descripción:</label><input name="descripcion" value={datosRol.descripcion || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Horario de apertura:</label><input type="time" name="horario_apertura" value={datosRol.horario_apertura || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Horario de cierre:</label><input type="time" name="horario_cierre" value={datosRol.horario_cierre || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
            </>
          )}

          {usuario.rol === 2 && (
            <>
              <div className="form-group"><label>Teléfono:</label><input name="telefono" value={datosRol.telefono || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Nombre del lugar:</label><input name="nombre_lugar" value={datosRol.nombre_lugar || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Encargado:</label><input name="encargado" value={datosRol.encargado || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Dirección:</label><input name="direccion" value={datosRol.direccion || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Capacidad:</label><input type="number" name="capacidad" value={datosRol.capacidad || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Horario de apertura:</label><input type="time" name="horario_apertura" value={datosRol.horario_apertura || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group"><label>Horario de cierre:</label><input type="time" name="horario_cierre" value={datosRol.horario_cierre || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
            </>
          )}

          {usuario.rol === 3 && (
            <>
              <div className="form-group"><label>Teléfono:</label><input name="telefono" value={datosRol.telefono || ''} onChange={(e) => handleChange(e, 'rol')} /></div>
              <div className="form-group">
                <label>Zona asignada:</label>
                <select name="zona" value={datosRol.zona || ''} onChange={(e) => handleChange(e, 'rol')}>
                  <option value="">Seleccione una zona</option>
                  {zonas.map(z => (
                    <option key={z.id} value={z.id}>
                      {z.nombre} ({z.codigo_postal})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="form-buttons">
            <button type="button" className="guardar-btn" onClick={handleSave}>
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

export default EditUser;

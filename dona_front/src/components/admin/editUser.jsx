import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/admin.css';

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
  const [zona, setZona] = useState(null);

  useEffect(() => {
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
          const detalles = dataRol[0];
          setDatosRol(detalles);

          // SOLO si es voluntario, buscar zona y dirección
          if (data.rol === 3 && detalles.zona) {
            const zonaId = detalles.zona;
            try {
              const zonaRes = await fetch(`http://127.0.0.1:8000/api/zonas/zonas/${zonaId}/`);
              const zonaData = await zonaRes.json();

              const ubiRes = await fetch(`http://127.0.0.1:8000/api/zonas/ubicaciones/?zona=${zonaId}`);
              const ubiData = await ubiRes.json();

              const direccionZona = Array.isArray(ubiData) && ubiData.length > 0
                ? `${ubiData[0].direccion}, ${zonaData.ciudad}, ${zonaData.estado}, CP ${zonaData.codigo_postal}`
                : 'Dirección no disponible';

              setZona({
                nombre: zonaData.nombre || 'Sin nombre',
                direccion: direccionZona,
              });
            } catch (zonaErr) {
              console.warn('❌ Error al obtener zona:', zonaErr);
              setZona({ nombre: 'Zona no encontrada', direccion: 'Sin dirección' });
            }
          }
        }
      } catch (error) {
        console.error('❌ Error al obtener datos del usuario:', error);
      }
    };

    fetchUsuario();
  }, [id]);

  if (!usuario || !datosRol) {
    return <div className="main-content">⏳ Cargando datos del usuario...</div>;
  }

  return (
    <div className="main-content">
      <h2>✏️ Editar Usuario</h2>
      <form className="user-form">
        <label>Nombre:</label>
        <input type="text" value={usuario.nombre} readOnly />

        <label>Correo:</label>
        <input type="email" value={usuario.correo} readOnly />

        <p><strong>Rol:</strong> {ROLES_MAP[usuario.rol]}</p>
        <p><strong>Estado:</strong> {usuario.activo ? '✅ Activo' : '⛔ Inactivo'}</p>
        <p><strong>Fecha de registro:</strong> {formatFecha(usuario.fecha_registro)}</p>

        {/* Donador */}
        {usuario.rol === 1 && (
          <>
            <label>Nombre del lugar:</label>
            <input value={datosRol.nombre_lugar || ''} readOnly />
            <label>Representante:</label>
            <input value={datosRol.representante || ''} readOnly />
            <label>Teléfono:</label>
            <input value={datosRol.telefono || ''} readOnly />
            <label>Descripción:</label>
            <input value={datosRol.descripcion || ''} readOnly />
            <label>Horario de apertura:</label>
            <input value={datosRol.horario_apertura || ''} readOnly />
            <label>Horario de cierre:</label>
            <input value={datosRol.horario_cierre || ''} readOnly />
          </>
        )}

        {/* Receptor */}
        {usuario.rol === 2 && (
          <>
            <label>Encargado:</label>
            <input value={datosRol.encargado || ''} readOnly />
            <label>Dirección:</label>
            <input value={datosRol.direccion || ''} readOnly />
            <label>Teléfono:</label>
            <input value={datosRol.telefono || ''} readOnly />
            <label>Capacidad:</label>
            <input value={datosRol.capacidad || ''} readOnly />
            <label>Horario de apertura:</label>
            <input value={datosRol.horario_apertura || ''} readOnly />
            <label>Horario de cierre:</label>
            <input value={datosRol.horario_cierre || ''} readOnly />
          </>
        )}

        {/* Voluntario */}
        {usuario.rol === 3 && (
          <>
            <label>Teléfono:</label>
            <input value={datosRol.telefono || ''} readOnly />
            <label>Zona asignada:</label>
            <input value={zona?.nombre || 'Zona no encontrada'} readOnly />
            <label>Dirección de zona:</label>
            <input value={zona?.direccion || 'Sin dirección'} readOnly />
          </>
        )}

        {/* Administrador */}
        {usuario.rol === 4 && (
          <>
            <label>Nombre del Administrador:</label>
            <input value={datosRol.nombre || ''} readOnly />
            <label>Correo:</label>
            <input value={datosRol.correo || ''} readOnly />
          </>
        )}
      </form>
    </div>
  );
};

export default EditUser;

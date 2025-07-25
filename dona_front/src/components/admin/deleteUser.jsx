import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fondoDecorativo from '../../assets/DonalogoHD.png';

const ROLES_MAP = {
  1: 'Donador',
  2: 'Receptor',
  3: 'Voluntario',
  4: 'Administrador'
};

const DeleteUser = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [datosRol, setDatosRol] = useState(null);
  const [zona, setZona] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatHoraAMPM = (hora) => {
    if (!hora) return '';
    const [hh, mm] = hora.split(':');
    let h = parseInt(hh, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${mm} ${ampm}`;
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/usuarios/usuarios/${id}/`);
        const data = await res.json();
        setUsuario(data);

        const endpointMap = {
          1: 'donadores',
          2: 'receptores',
          3: 'voluntarios',
          4: 'administradores'
        };

        const endpoint = endpointMap[data.rol];
        const resRol = await fetch(`http://127.0.0.1:8000/api/usuarios/${endpoint}/?usuario=${id}`);
        const dataRol = await resRol.json();

        const entidadCorrecta = dataRol.find(item => item.usuario?.id === parseInt(id));
        setDatosRol(entidadCorrecta);

        if (data.rol === 3 && entidadCorrecta?.zona) {
          const zonaRes = await fetch(`http://127.0.0.1:8000/api/zonas/zonas/${entidadCorrecta.zona}/`);
          const zonaData = await zonaRes.json();
          setZona(zonaData);
        }
      } catch (err) {
        console.error("❌ Error al obtener datos del usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleDelete = async () => {
    const rolMap = {
      1: "donadores",
      2: "receptores",
      3: "voluntarios",
      4: "administradores"
    };

    try {
      const endpoint = rolMap[usuario.rol];

      // Buscar entidad exacta por ID de usuario
      const resRelacion = await fetch(`http://127.0.0.1:8000/api/usuarios/${endpoint}/?usuario=${id}`);
      const dataRelacion = await resRelacion.json();
      const entidadCorrecta = dataRelacion.find(item => item.usuario?.id === parseInt(id));
      const hijoId = entidadCorrecta?.id;

      // Eliminar la entidad específica si existe
      if (hijoId) {
        await fetch(`http://127.0.0.1:8000/api/usuarios/${endpoint}/${hijoId}/`, {
          method: 'DELETE',
        });
      }

      // PATCH al usuario principal para dejarlo inactivo
      await fetch(`http://127.0.0.1:8000/api/usuarios/usuarios/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activo: false }),
      });

      alert("✅ Usuario eliminado del panel administrativo.");
      window.location.hash = '#/usuarios';
    } catch (err) {
      alert("❌ Error, no se pudo eliminar del panel administrativo.");
      console.error(err);
    }
  };

  // --- Render condicionales con protección ---
  if (loading) {
    return <div className="main-content">⏳ Cargando usuario...</div>;
  }

  if (usuario && !datosRol) {
    return (
      <div className="main-content">
        <h2>🔍 Usuario fuera de operación</h2>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p style={{ marginTop: '1rem', color: '#d35400', fontWeight: 'bold' }}>
          ⚠️ Este usuario ya no tiene entidad activa en el sistema.<br />
          Revisa directamente en la base de datos para más información.
        </p>
        <button
          className="cancel-delete-btn"
          onClick={() => {
            window.location.hash = '#/usuarios';
          }}
        >
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />
      <h2>🗑️ Eliminar Usuario</h2>
      <div className="rol-destacado">{ROLES_MAP[usuario.rol]}</div>
      <table className="user-summary-table">
        <tbody>
          <tr><th>Nombre</th><td>{usuario.nombre}</td></tr>
          <tr><th>Correo</th><td>{usuario.correo}</td></tr>

          {usuario.rol === 1 && (
            <>
              <tr><th>Nombre del lugar</th><td>{datosRol.nombre_lugar}</td></tr>
              <tr><th>Representante</th><td>{datosRol.representante}</td></tr>
              <tr><th>Teléfono</th><td>{datosRol.telefono}</td></tr>
              <tr><th>Horario</th><td>{formatHoraAMPM(datosRol.horario_apertura)} - {formatHoraAMPM(datosRol.horario_cierre)}</td></tr>
            </>
          )}

          {usuario.rol === 2 && (
            <>
              <tr><th>Encargado</th><td>{datosRol.encargado}</td></tr>
              <tr><th>Teléfono</th><td>{datosRol.telefono}</td></tr>
              <tr><th>Dirección</th><td>{datosRol.direccion}</td></tr>
              <tr><th>Capacidad</th><td>{datosRol.capacidad}</td></tr>
              <tr><th>Horario</th><td>{formatHoraAMPM(datosRol.horario_apertura)} - {formatHoraAMPM(datosRol.horario_cierre)}</td></tr>
            </>
          )}

          {usuario.rol === 3 && (
            <>
              <tr><th>Teléfono</th><td>{datosRol.telefono}</td></tr>
              <tr><th>Zona</th><td>{zona ? `${zona.nombre} (${zona.codigo_postal})` : 'Cargando zona...'}</td></tr>
            </>
          )}
        </tbody>
      </table>

      <p style={{ marginTop: '1.2rem', color: '#b00020', fontWeight: 'bold' }}>
        ⚠️ Esta acción no se puede deshacer. ¿Estás segur@ que deseas eliminar este usuario?
      </p>

      <div className="delete-buttons">
        <button className="delete-confirm-btn" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i> Eliminar
        </button>
        <button className="cancel-delete-btn" onClick={() => {
          window.location.hash = '#/usuarios';
        }}>
          <i className="fas fa-times-circle"></i> Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;

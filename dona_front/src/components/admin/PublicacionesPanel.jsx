/**
 * Responsable: Mariela Higuera
 * Descripción: Lista y gestiona las publicaciones de donaciones realizadas por los donadores.
 */

import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';
import { useNavigate } from 'react-router-dom';

const PublicacionesPanel = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [receptores, setReceptores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [donadores, setDonadores] = useState([]);
  const [estadosDonacion, setEstadosDonacion] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 NUEVO

  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [activosPrimero, setActivosPrimero] = useState(false);
  const [ordenTitulo, setOrdenTitulo] = useState('az');

  const [modalAbierto, setModalAbierto] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          publiRes,
          sucursalRes,
          zonasRes,
          solicitudesRes,
          receptoresRes,
          usuariosRes,
          donadoresRes,
          estadosRes
        ] = await Promise.all([
          fetch('http://localhost:8000/api/donaciones/publicaciones/'),
          fetch('http://localhost:8000/api/donaciones/sucursales/'),
          fetch('http://localhost:8000/api/zonas/zonas/'),
          fetch('http://localhost:8000/api/solicitudes/solicitudes/'),
          fetch('http://localhost:8000/api/usuarios/receptores/'),
          fetch('http://localhost:8000/api/usuarios/usuarios/'),
          fetch('http://localhost:8000/api/usuarios/donadores/'),
          fetch('http://localhost:8000/api/donaciones/estados/')
        ]);

        setPublicaciones(await publiRes.json());
        setSucursales(await sucursalRes.json());
        setZonas(await zonasRes.json());
        setSolicitudes(await solicitudesRes.json());
        setReceptores(await receptoresRes.json());
        setUsuarios(await usuariosRes.json());
        setDonadores(await donadoresRes.json());
        setEstadosDonacion(await estadosRes.json());
        setLoading(false); // ✅ TERMINÓ DE CARGAR
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
        setLoading(false); // ⚠️ También en error
      }
    };

    fetchData();
  }, []);

  const obtenerSucursal = (id) => sucursales.find(s => s.id === id);
  const obtenerZona = (zonaId) => zonas.find(z => z.id === zonaId)?.nombre || '—';
  const obtenerSolicitud = (publicacionId) => solicitudes.find(s => s.publicacion_id === publicacionId);
  const obtenerReceptor = (receptorId) => receptores.find(r => r.id === receptorId);
  const obtenerUsuario = (usuarioId) => usuarios.find(u => u.id === usuarioId);
  const obtenerDonador = (donadorId) => donadores.find(d => d.id === donadorId);
  const obtenerNombreEstado = (estadoId) => estadosDonacion.find(e => e.id === estadoId)?.nombre || '—';

  const obtenerClaseEstado = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'disponible': return 'estado-btn activo';
      case 'cancelado': return 'estado-btn inactivo';
      case 'en camino': return 'estado-btn amarillo';
      case 'entregado': return 'estado-btn azul';
      default: return 'estado-btn';
    }
  };

  const publicacionesFiltradas = publicaciones
    .filter(publi =>
      publi.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
    )
    .filter(publi => {
      const estadoNombre = obtenerNombreEstado(publi.estado)?.toLowerCase();
      return !estadoFiltro || estadoNombre === estadoFiltro.toLowerCase();
    })
    .sort((a, b) => {
      const estadoA = obtenerNombreEstado(a.estado)?.toLowerCase();
      const estadoB = obtenerNombreEstado(b.estado)?.toLowerCase();

      if (activosPrimero) {
        if (estadoA === 'disponible' && estadoB !== 'disponible') return -1;
        if (estadoA !== 'disponible' && estadoB === 'disponible') return 1;
      }

      const tituloA = a.titulo.toLowerCase();
      const tituloB = b.titulo.toLowerCase();

      return ordenTitulo === 'az'
        ? tituloA.localeCompare(tituloB)
        : tituloB.localeCompare(tituloA);
    });

  const abrirModal = (publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPublicacionSeleccionada(null);
  };

  return (
    <div className="main-content">




      <h2 style={{ marginTop: '10px' }}>
  <i className="fas fa-box-open" style={{ marginRight: '10px', color: '#333' }}></i>
  Gestión de publicaciones
</h2>



      <button className="create-user-btn" onClick={() => navigate('/publicaciones/crear')}>
        ➕ Crear publicación
      </button>

      <div className="filtro-barra">
  <input
    type="text"
    placeholder="🔍 Buscar por título"
    value={filtroTitulo}
    onChange={(e) => setFiltroTitulo(e.target.value)}
    className="input-busqueda"
    style={{
      marginTop: '15px',
      marginBottom: '-10px'
    }}
  />

  <label
    className="checkbox-label"
    style={{
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      marginLeft: '6px',
      fontSize: '14px',
      marginTop: '8px',
      marginRight: '8px',
      gap: '8px'
    }}
  >
    <span>Activos primero</span>
    <input
      type="checkbox"
      checked={activosPrimero}
      onChange={(e) => setActivosPrimero(e.target.checked)}
      style={{
        width: '18px',
        height: '18px',
        cursor: 'pointer',
        marginTop: '18px'
      }}
    />
  </label>

  <select
    value={estadoFiltro}
    onChange={(e) => setEstadoFiltro(e.target.value)}
    className="filtro-select"
  >
    <option value="">Todos los estados</option>
    {estadosDonacion.map((estado) => (
      <option key={estado.id} value={estado.nombre}>
        {estado.nombre}
      </option>
    ))}
  </select>

  Ordenar por:
  <select
    value={ordenTitulo}
    onChange={(e) => setOrdenTitulo(e.target.value)}
    className="filtro-select"
  >
    <option value="az">A → Z</option>
    <option value="za">Z → A</option>
  </select>
</div>


<div className="espaciado-negativo"></div>
      <table className="user-table">
        <thead>
  <tr>
    <th style={{ textAlign: 'center' }}>Título</th>
    <th style={{ textAlign: 'center' }}>Sucursal</th>
    <th style={{ textAlign: 'center' }}>Zona</th>
    <th style={{ textAlign: 'center' }}>Estado</th>
    <th style={{ textAlign: 'center' }}>Acciones</th>
  </tr>
</thead>
<tbody>
  {loading ? (
    <tr>
      <td colSpan="5" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
        ⏳ Cargando publicaciones...
      </td>
    </tr>
  ) : publicacionesFiltradas.length === 0 ? (
    <tr>
      <td colSpan="5" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
        No hay publicaciones que coincidan con los filtros aplicados.
      </td>
    </tr>
  ) : (
    publicacionesFiltradas.map(publi => {
      const sucursal = obtenerSucursal(publi.sucursal);
      const estadoNombre = obtenerNombreEstado(publi.estado);
      const claseEstado = obtenerClaseEstado(estadoNombre);

      return (
        <tr key={publi.id}>
          <td style={{ textAlign: 'center' }}>{publi.titulo}</td>
          <td style={{ textAlign: 'center' }}>{sucursal?.nombre || 'Sucursal desconocida'}</td>
          <td style={{ textAlign: 'center' }}>{publi.zona ? obtenerZona(publi.zona) : '—'}</td>
          <td style={{ textAlign: 'center' }}>
            <button className={claseEstado}>{estadoNombre}</button>
          </td>
          <td style={{ textAlign: 'center' }}>
            <button className="view-btn" onClick={() => abrirModal(publi)}>🔍 Ver más</button>
            <button className="edit-btn" onClick={() => navigate(`/publicaciones/editar/${publi.id}`)}>✏️ Editar</button>
            <button className="delete-btn" onClick={() => navigate(`/publicaciones/eliminar/${publi.id}`)}>🗑️ Eliminar</button>
          </td>
        </tr>
      );
    })
  )}
</tbody>

      </table>

      {modalAbierto && publicacionSeleccionada && (() => {
        const sucursal = obtenerSucursal(publicacionSeleccionada.sucursal);
        const zonaNombre = publicacionSeleccionada.zona ? obtenerZona(publicacionSeleccionada.zona) : '—';
        const solicitud = obtenerSolicitud(publicacionSeleccionada.id);
        const receptor = solicitud ? obtenerReceptor(solicitud.receptor_id) : null;
        const usuarioReceptor = receptor ? obtenerUsuario(receptor.usuario) : null;
        const donador = sucursal ? obtenerDonador(sucursal.donador) : null;
        const estadoNombre = obtenerNombreEstado(publicacionSeleccionada.estado);

        return (
          <div className="modal-overlay">
            <div className="modal-detalles">
              <h3><i className="fas fa-file-alt"></i> Detalles de la Publicación</h3>

              <div className="modal-seccion">
                <div className="campo"><span>Título:</span> {publicacionSeleccionada.titulo}</div>
                <div className="campo"><span>Descripción:</span> {publicacionSeleccionada.descripcion || '—'}</div>
                <div className="campo"><span>Cantidad:</span> {publicacionSeleccionada.cantidad}</div>
              </div>

              <div className="modal-seccion">
                <h4><i className="fas fa-store"></i> Sucursal y Restaurante</h4>
                <div className="campo"><span>Sucursal:</span> {sucursal?.nombre || '—'}</div>
                <div className="campo"><span>Representante:</span> {sucursal?.representante || '—'}</div>
                <div className="campo"><span>Restaurante:</span> {donador?.nombre_lugar || '—'}</div>
              </div>

              <div className="modal-seccion">
                <h4><i className="fas fa-map-marker-alt"></i> Zona</h4>
                <div className="campo"><span>Zona:</span> {zonaNombre}</div>
              </div>

              <div className="modal-seccion">
                <h4><i className="fas fa-calendar-day"></i> Fechas y Estado</h4>
                <div className="campo"><span>Fecha de publicación:</span> {publicacionSeleccionada.fecha_publicacion?.split('T')[0]}</div>
                <div className="campo"><span>Fecha de caducidad:</span> {publicacionSeleccionada.fecha_caducidad || '—'}</div>
                <div className="campo"><span>Estado:</span> {estadoNombre}</div>
              </div>

              {solicitud && receptor && (
                <div className="modal-seccion">
                  <h4><i className="fas fa-home"></i> Refugio Solicitante</h4>
                  <div className="campo"><span>Refugio:</span> {receptor.nombre_lugar}</div>
                  <div className="campo"><span>Usuario:</span> {usuarioReceptor?.nombre || '—'}</div>
                  <div className="campo"><span>Dirección:</span> {receptor.direccion}</div>
                  <div className="campo"><span>Estado de solicitud:</span> {solicitud.estado}</div>
                  <div className="campo"><span>Comentarios:</span> {solicitud.comentarios || '—'}</div>
                  <div className="campo"><span>Fecha de solicitud:</span> {solicitud.fecha_solicitud?.split('T')[0] || '—'}</div>
                </div>
              )}

              <button className="cerrar-btn" onClick={cerrarModal}><i className="fas fa-times"></i> Cerrar</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default PublicacionesPanel;

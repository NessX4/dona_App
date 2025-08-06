
/**
 * Responsable: Mariela Higuera
 * Descripción: Administra las solicitudes de donaciones, permitiendo ver detalles, editar o acceder a su historial.
 */


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';

const SolicitudesPanel = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [receptores, setReceptores] = useState([]);
  const [estadosDonacion, setEstadosDonacion] = useState([]);

  const [filtroTexto, setFiltroTexto] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [orden, setOrden] = useState('reciente');
  const [loading, setLoading] = useState(true);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solRes, pubRes, sucRes, recRes, estadosRes] = await Promise.all([
          fetch('http://localhost:8000/api/solicitudes/solicitudes/'),
          fetch('http://localhost:8000/api/donaciones/publicaciones/'),
          fetch('http://localhost:8000/api/donaciones/sucursales/'),
          fetch('http://localhost:8000/api/usuarios/receptores/'),
          fetch('http://localhost:8000/api/donaciones/estados/')
        ]);

        setSolicitudes(await solRes.json());
        setPublicaciones(await pubRes.json());
        setSucursales(await sucRes.json());
        setReceptores(await recRes.json());
        setEstadosDonacion(await estadosRes.json());
      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPublicacion = (id) => publicaciones.find(p => p.id === id);
  const getSucursal = (id) => sucursales.find(s => s.id === id);
  const getReceptor = (id) => receptores.find(r => r.id === id);
  const getEstadoNombre = (estado) => estado || '—';

  const obtenerClaseEstado = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'disponible': return 'estado-btn activo';
      case 'cancelado': return 'estado-btn inactivo';
      case 'en camino': return 'estado-btn amarillo';
      case 'entregado': return 'estado-btn azul';
      default: return 'estado-btn';
    }
  };

  const solicitudesFiltradas = solicitudes
    .filter(s => {
      const pub = getPublicacion(s.publicacion);
      const texto = filtroTexto.toLowerCase();
      const estado = getEstadoNombre(s.estado).toLowerCase();
      return pub?.titulo?.toLowerCase().includes(texto) &&
             (!estadoFiltro || estado === estadoFiltro.toLowerCase());
    })
    .sort((a, b) => {
      const fechaA = new Date(a.fecha_solicitud);
      const fechaB = new Date(b.fecha_solicitud);
      return orden === 'reciente' ? fechaB - fechaA : fechaA - fechaB;
    });

  const abrirModal = (s) => {
    setSolicitudSeleccionada(s);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setSolicitudSeleccionada(null);
  };

  return (
    <div className="main-content">


      
      <h2 style={{ marginTop: '10px' }}>
  <i className="fas fa-envelope-open-text" style={{ marginRight: '10px', color: '#333' }}></i>
  Gestión de solicitudes
</h2>

      <button className="create-user-btn" onClick={() => navigate('/solicitudes/crear')}>
        ➕ Crear solicitud
      </button>

      <div className="filtro-barra">
         <input
    type="text"
    placeholder="🔍 Buscar por título"
    value={filtroTexto}
    onChange={(e) => setFiltroTexto(e.target.value)}
    className="input-busqueda"
    style={{
      marginTop: '15px',
      marginBottom: '10px'
    }}
  />





        <select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
          <option value="">Todos los estados</option>
          {estadosDonacion.map(estado => (
            <option key={estado.id} value={estado.nombre}>{estado.nombre}</option>
          ))}
        </select>

        Ordenar por:
        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
          <option value="reciente">Más recientes</option>
          <option value="antiguo">Más antiguos</option>
        </select>
      </div>


<div className="espaciado-negativo"></div>
<div style={{ height: '5px' }}></div>


 
      <table className="user-table">
        
<thead>
  <tr>
    <th style={{ textAlign: 'center' }}>Publicación</th>
    <th style={{ textAlign: 'center' }}>Sucursal</th>
    <th style={{ textAlign: 'center' }}>Fecha</th>
    <th style={{ textAlign: 'center' }}>Estado</th>
    <th style={{ textAlign: 'center' }}>Acciones</th>
  </tr>
</thead>

<tbody>
  {loading ? (
    <tr>
      <td colSpan="5" className="text-center py-4">⏳ Cargando solicitudes...</td>
    </tr>
  ) : solicitudesFiltradas.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center py-4">
        No hay solicitudes que coincidan con los filtros aplicados.
      </td>
    </tr>
  ) : (
    solicitudesFiltradas.map((s) => {
      const pub = getPublicacion(s.publicacion);
      const suc = getSucursal(pub?.sucursal);
      const estadoNombre = getEstadoNombre(s.estado);
      const claseEstado = obtenerClaseEstado(estadoNombre);

      return (
        <tr key={s.id}>
          <td style={{ textAlign: 'center' }}>{pub?.titulo || '—'}</td>
          <td style={{ textAlign: 'center' }}>{suc?.nombre || '—'}</td>
          <td style={{ textAlign: 'center' }}>{new Date(s.fecha_solicitud).toLocaleDateString()}</td>
          <td style={{ textAlign: 'center' }}>
            <span className={claseEstado}>{estadoNombre}</span>
          </td>
          <td style={{ textAlign: 'center' }}>
            <button className="view-btn" onClick={() => abrirModal(s)}>🔍 Ver más</button>
            <button className="edit-btn" onClick={() => navigate(`/solicitudes/editar/${s.id}`)}>✏️ Editar</button>
            <button className="delete-btn" onClick={() => navigate(`/solicitudes/historial/${s.id}`)}>📜 Eliminar historial</button>
          </td>
        </tr>
      );
    })
  )}
</tbody>

      </table>

      {/* Modal con detalles */}
      {modalAbierto && solicitudSeleccionada && (() => {
        const pub = getPublicacion(solicitudSeleccionada.publicacion);
        const suc = getSucursal(pub?.sucursal);
        const rec = getReceptor(solicitudSeleccionada.receptor);
        const estadoNombre = getEstadoNombre(solicitudSeleccionada.estado);
        const claseEstado = obtenerClaseEstado(estadoNombre);

        return (
          <div className="modal-overlay">
            <div className="modal-detalles">
              <h3><i className="fas fa-envelope-open-text"></i> Detalles de la Solicitud</h3>

              <div className="modal-seccion">
                <h4><i className="fas fa-box-open"></i> Publicación</h4>
                <div className="campo"><span>Título:</span> {pub?.titulo || '—'}</div>
                <div className="campo"><span>Descripción:</span> {pub?.descripcion || '—'}</div>
                <div className="campo"><span>Cantidad:</span> {pub?.cantidad || '—'}</div>
              </div>

              <div className="modal-seccion">
                <h4><i className="fas fa-store"></i> Sucursal</h4>
                <div className="campo">
                  <span>Sucursal:</span> {suc?.nombre ? `${suc.nombre} - ${suc.direccion}` : '—'}
                </div>
                <div className="campo"><span>Representante:</span> {suc?.representante || '—'}</div>
                <div className="campo"><span>Teléfono:</span> {suc?.telefono || '—'}</div>
              </div>

              <div className="modal-seccion">
                <h4><i className="fas fa-hand-holding-heart"></i> Receptor</h4>
                <div className="campo"><span>Nombre del lugar:</span> {rec?.nombre_lugar || '—'}</div>
                <div className="campo"><span>Encargado:</span> {rec?.encargado || '—'}</div>
                <div className="campo"><span>Teléfono:</span> {rec?.telefono || '—'}</div>
              </div>

              <div className="modal-seccion">
                <h4><i className="fas fa-calendar-day"></i> Solicitud</h4>
                <div className="campo"><span>Fecha de solicitud:</span> {solicitudSeleccionada.fecha_solicitud?.split('T')[0]}</div>
                <div className="campo">
                  <span>Estado:</span>{' '}
                  <span className={claseEstado} style={{ marginLeft: '8px' }}>{estadoNombre}</span>
                </div>
                <div className="campo"><span>Comentarios:</span> {solicitudSeleccionada.comentarios || '—'}</div>
              </div>

              <button className="cerrar-btn" onClick={cerrarModal}>
                <i className="fas fa-times"></i> Cerrar
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default SolicitudesPanel;

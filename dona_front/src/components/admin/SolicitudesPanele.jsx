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
  const getEstadoDonacion = (publicacionId) => {
    const pub = getPublicacion(publicacionId);
    return estadosDonacion.find(e => e.id === pub?.estado)?.nombre || '—';
  };

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
      return pub?.titulo?.toLowerCase().includes(texto);
    })
    .sort((a, b) => {
      if (orden === 'reciente') {
        return new Date(b.fecha_solicitud) - new Date(a.fecha_solicitud);
      } else {
        return new Date(a.fecha_solicitud) - new Date(b.fecha_solicitud);
      }
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
      <h2>📮 Gestión de Solicitudes</h2>

      <button className="create-user-btn" onClick={() => navigate('/solicitudes/crear')}>
        ➕ Crear Solicitud
      </button>

      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por título"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
        />
        Ordenar por:
        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
          <option value="reciente">Más recientes</option>
          <option value="antiguo">Más antiguos</option>
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Publicación</th>
            <th>Sucursal</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
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
              const estadoNombre = getEstadoDonacion(s.publicacion);
              const claseEstado = obtenerClaseEstado(estadoNombre);

              return (
                <tr key={s.id}>
                  <td>{pub?.titulo || '—'}</td>
                  <td>{suc?.nombre || '—'}</td>
                  <td>{new Date(s.fecha_solicitud).toLocaleDateString()}</td>
                  <td><span className={claseEstado}>{estadoNombre}</span></td>
                  <td>
                    <button className="view-btn" onClick={() => abrirModal(s)}>🔍 Ver más</button>
                    <button className="edit-btn" onClick={() => navigate(`/solicitudes/editar/${s.id}`)}>✏️ Editar</button>
                    <button className="delete-btn" onClick={() => navigate(`/solicitudes/historial/${s.id}`)}>📜 Historial</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {modalAbierto && solicitudSeleccionada && (() => {
        const pub = getPublicacion(solicitudSeleccionada.publicacion);
        const suc = getSucursal(pub?.sucursal);
        console.log(solicitudSeleccionada.receptor)

        const rec = getReceptor(solicitudSeleccionada.receptor);

        const estadoNombre = getEstadoDonacion(solicitudSeleccionada.publicacion);

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
  <h4><i className="fas fa-store"></i> Sucursal</h4><div className="campo">
  <span>Sucursal:</span>{' '}
  {suc?.nombre ? `${suc.nombre} - ${suc.direccion}` : '—'}
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
                <div className="campo"><span>Estado:</span> {estadoNombre}</div>
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

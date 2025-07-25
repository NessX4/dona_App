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
  const [filtroTitulo, setFiltroTitulo] = useState('');
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
          donadoresRes
        ] = await Promise.all([
          fetch('http://localhost:8000/api/donaciones/publicaciones/'),
          fetch('http://localhost:8000/api/donaciones/sucursales/'),
          fetch('http://localhost:8000/api/zonas/zonas/'),
          fetch('http://localhost:8000/api/solicitudes/solicitudes/'),
          fetch('http://localhost:8000/api/usuarios/receptores/'),
          fetch('http://localhost:8000/api/usuarios/usuarios/'),
          fetch('http://localhost:8000/api/usuarios/donadores/')
        ]);

        setPublicaciones(await publiRes.json());
        setSucursales(await sucursalRes.json());
        setZonas(await zonasRes.json());
        setSolicitudes(await solicitudesRes.json());
        setReceptores(await receptoresRes.json());
        setUsuarios(await usuariosRes.json());
        setDonadores(await donadoresRes.json());
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
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

  const publicacionesFiltradas = publicaciones.filter(publi =>
    publi.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
  );

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
      <h2>📦 Gestión de Publicaciones</h2>

      <button className="create-user-btn" onClick={() => navigate('/publicaciones/crear')}>
  ➕ Crear Publicación
</button>

      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Sucursal</th>
            <th>Zona</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {publicacionesFiltradas.map(publi => {
            const sucursal = obtenerSucursal(publi.sucursal);
            return (
              <tr key={publi.id}>
                <td>{publi.titulo}</td>
                <td>{sucursal?.nombre || 'Sucursal desconocida'}</td>
                <td>{publi.zona ? obtenerZona(publi.zona) : '—'}</td>
                <td>
                  <button className={publi.estado === 1 ? 'estado-btn activo' : 'estado-btn inactivo'}>
                    {publi.estado === 1 ? '✅ Activa' : '⛔ Inactiva'}
                  </button>
                </td>
                <td>
                  <button className="view-btn" onClick={() => abrirModal(publi)}>🔍 Ver más</button>
                  
                  <button className="edit-btn" onClick={() => navigate(`/publicaciones/editar/${publi.id}`)}>✏️ Editar</button>
                  
                  <button className="delete-btn" onClick={() => navigate(`/publicaciones/eliminar/${publi.id}`)}>🗑️ Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalAbierto && publicacionSeleccionada && (() => {
        const sucursal = obtenerSucursal(publicacionSeleccionada.sucursal);
        const zonaNombre = publicacionSeleccionada.zona ? obtenerZona(publicacionSeleccionada.zona) : '—';
        const solicitud = obtenerSolicitud(publicacionSeleccionada.id);
        const receptor = solicitud ? obtenerReceptor(solicitud.receptor_id) : null;
        const usuarioReceptor = receptor ? obtenerUsuario(receptor.usuario) : null;
        const donador = sucursal ? obtenerDonador(sucursal.donador) : null;

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
                <div className="campo"><span>Estado:</span> <span className="estado-activo">{publicacionSeleccionada.estado === 1 ? 'Activa' : 'Inactiva'}</span></div>
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

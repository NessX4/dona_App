import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';

const LogsPanel = () => {
  const [logsOriginal, setLogsOriginal] = useState([]);
  const [logsFiltrados, setLogsFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenFecha, setOrdenFecha] = useState('recientes');
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');

  useEffect(() => {
    fetch('http://localhost:8000/api/usuarios/logs/')
      .then(res => res.json())
      .then(data => {
        setLogsOriginal(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar los logs:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtrados = [...logsOriginal];

    if (busqueda.trim() !== '') {
      filtrados = filtrados.filter(log =>
        log.usuario?.toLowerCase().includes(busqueda.toLowerCase()) ||
        log.accion?.toLowerCase().includes(busqueda.toLowerCase()) ||
        log.detalle?.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (filtroTipo !== 'todos') {
      filtrados = filtrados.filter(log =>
        getCrudType(log.accion).toLowerCase() === filtroTipo
      );
    }

    filtrados.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return ordenFecha === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
    });

    setLogsFiltrados(filtrados);
  }, [busqueda, ordenFecha, filtroTipo, logsOriginal]);

  const getBadgeClass = (accion) => {
    if (!accion) return '';
    const lower = accion.toLowerCase();
    if (lower.includes('creación')) return 'badge badge-create';
    if (lower.includes('eliminación')) return 'badge badge-delete';
    if (lower.includes('edición')) return 'badge badge-edit';
    return 'badge';
  };

  const getCrudType = (accion) => {
    if (!accion) return '';
    const lower = accion.toLowerCase();
    if (lower.includes('creación')) return 'CREATE';
    if (lower.includes('eliminación')) return 'DELETE';
    if (lower.includes('edición')) return 'EDIT';
    return '';
  };

  return (
    <div className="main-content">
      <h2>📜 Panel de Logs</h2>

      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por usuario"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <label>Ordenar por:</label>
        <select value={ordenFecha} onChange={(e) => setOrdenFecha(e.target.value)}>
          <option value="recientes">Más recientes primero</option>
          <option value="antiguas">Más antiguas primero</option>
        </select>

        <label>Filtrar por tipo:</label>
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="create">Creaciones</option>
          <option value="edit">Ediciones</option>
          <option value="delete">Eliminaciones</option>
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Tipo</th>
            <th>Detalle</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">⏳ Cargando logs...</td>
            </tr>
          ) : logsFiltrados.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay registros que coincidan con la búsqueda.</td>
            </tr>
          ) : (
            logsFiltrados.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.fecha).toLocaleString()}</td>
                <td>{log.usuario || '—'}</td>
                <td>{log.accion}</td>
                <td><span className={getBadgeClass(log.accion)}>{getCrudType(log.accion)}</span></td>
                <td>{log.detalle}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPanel;

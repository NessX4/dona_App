import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';

const LogsPanel = () => {
  const [logsOriginal, setLogsOriginal] = useState([]);
  const [logsFiltrados, setLogsFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenFecha, setOrdenFecha] = useState('recientes');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/usuarios/logs/')
      .then(res => res.json())
      .then(data => {
        setLogsOriginal(data);  // data ya es un array plano
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

    filtrados.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return ordenFecha === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
    });

    setLogsFiltrados(filtrados);
  }, [busqueda, ordenFecha, logsOriginal]);

  return (
    <div className="main-content">
      <h2>📜 Panel de Logs</h2>

      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por usuario, acción o detalle"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <label style={{ marginLeft: '1rem' }}>Ordenar por fecha:</label>
        <select value={ordenFecha} onChange={(e) => setOrdenFecha(e.target.value)}>
          <option value="recientes">Más recientes primero</option>
          <option value="antiguas">Más antiguas primero</option>
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
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
                <td>{log.id}</td>
                <td>{new Date(log.fecha).toLocaleString()}</td>
                <td>{log.usuario || '—'}</td>
                <td>{log.accion}</td>
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

import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';

const LogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚙️ Obtener logs (provisionalmente estáticos o desde backend si ya existe)
  useEffect(() => {
    // Puedes cambiar este fetch por tu endpoint real cuando lo tengas
    fetch('http://localhost:8000/api/logs/')  // ← Ajusta este endpoint si es necesario
      .then(res => res.json())
      .then(data => {
        setLogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar los logs:', error);
        setLogs([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-content">
      <h2>📜 Panel de Logs</h2>

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
          ) : logs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay registros para mostrar.</td>
            </tr>
          ) : (
            logs.map((log) => (
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

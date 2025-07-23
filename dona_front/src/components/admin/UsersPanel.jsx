// src/components/admin/UsersPanel.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';
import { useNavigate } from 'react-router-dom';

// Diccionario para traducir ID de rol a nombre legible
const ROLES_MAP = {
  1: 'Donador',
  2: 'Receptor',
  3: 'Voluntario',
  4: 'Administrador'
};

const UsersPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const [nombreFiltro, setNombreFiltro] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');
  const [activosPrimero, setActivosPrimero] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/usuarios/usuarios/')
      .then(response => response.json())
      .then(data => {
        setUsuarios(data);
        setUsuariosFiltrados(data);
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  useEffect(() => {
    let filtrados = [...usuarios];

    // Filtro por nombre
    if (nombreFiltro.trim() !== '') {
      filtrados = filtrados.filter(user =>
        user.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
      );
    }

    // Filtro por rol
    if (rolFiltro) {
      filtrados = filtrados.filter(user => user.rol === parseInt(rolFiltro));
    }

    // Ordenar activos primero
    if (activosPrimero) {
      filtrados.sort((a, b) => {
        if (a.activo === b.activo) return 0;
        return a.activo ? -1 : 1;
      });
    }

    setUsuariosFiltrados(filtrados);
  }, [nombreFiltro, rolFiltro, activosPrimero, usuarios]);

  const toggleActivo = (id, estadoActual) => {
    console.log(`Aquí iría lógica para cambiar estado de ${id} a ${!estadoActual}`);
    // Puedes implementar aquí un PATCH más adelante
  };

  return (
    <div className="main-content">
      <h2>👥 Gestión de Usuarios</h2>

      <button
        className="create-user-btn"
        onClick={() => navigate('/usuarios/crear')}
      >
        ➕ Crear Usuario
      </button>

      {/* Barra de filtros */}
      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)}
        />

        <select value={rolFiltro} onChange={(e) => setRolFiltro(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="1">Donador</option>
          <option value="2">Receptor</option>
          <option value="3">Voluntario</option>
          <option value="4">Administrador</option>
        </select>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={activosPrimero}
            onChange={(e) => setActivosPrimero(e.target.checked)}
          />
          Activos primero
        </label>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{ROLES_MAP[user.rol] || 'Desconocido'}</td>
              <td>
                <button
                  className={user.activo ? 'estado-btn activo' : 'estado-btn inactivo'}
                  onClick={() => toggleActivo(user.id, user.activo)}
                >
                  {user.activo ? '✅ Activo' : '⛔ Inactivo'}
                </button>
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/usuarios/editar/${user.id}`)}
                >
                  ✏️ Editar
                </button>
                <button className="delete-btn">🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPanel;

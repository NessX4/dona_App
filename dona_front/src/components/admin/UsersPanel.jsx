// src/components/admin/UsersPanel.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';
import { useNavigate } from 'react-router-dom';

// Diccionario para traducir ID de rol a nombre legible
const ROLES_MAP = {
  1: 'Donador',
  2: 'Receptor',
  3: 'Voluntario'
};

const UsersPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');
  const [activosPrimero, setActivosPrimero] = useState(false);
  const [ordenNombre, setOrdenNombre] = useState('az'); // A → Z por defecto

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/usuarios/usuarios/');
        const data = await res.json();
        const usuariosSinAdmins = data.filter(user => user.rol !== 4);

        // Obtener todas las entidades hijas
        const [donadores, receptores, voluntarios] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/usuarios/donadores/').then(res => res.json()),
          fetch('http://127.0.0.1:8000/api/usuarios/receptores/').then(res => res.json()),
          fetch('http://127.0.0.1:8000/api/usuarios/voluntarios/').then(res => res.json())
        ]);

        const donadoresSet = new Set(donadores.map(d => d.usuario?.id));
        const receptoresSet = new Set(receptores.map(r => r.usuario?.id));
        const voluntariosSet = new Set(voluntarios.map(v => v.usuario?.id));

        // Filtrar usuarios que están activos o tienen su entidad hija todavía
        const filtrados = usuariosSinAdmins.filter(u => {
          if (u.activo) return true;
          if (u.rol === 1 && donadoresSet.has(u.id)) return true;
          if (u.rol === 2 && receptoresSet.has(u.id)) return true;
          if (u.rol === 3 && voluntariosSet.has(u.id)) return true;
          return false;
        });

        filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));

        setUsuarios(filtrados);
        setUsuariosFiltrados(filtrados);
      } catch (error) {
        console.error('❌ Error al obtener usuarios y entidades:', error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    let filtrados = [...usuarios];

    if (nombreFiltro.trim() !== '') {
      filtrados = filtrados.filter(user =>
        user.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
      );
    }

    if (rolFiltro) {
      filtrados = filtrados.filter(user => user.rol === parseInt(rolFiltro));
    }

    if (activosPrimero) {
      filtrados.sort((a, b) => {
        if (a.activo !== b.activo) return a.activo ? -1 : 1;
        return ordenNombre === 'az'
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      });
    } else {
      filtrados.sort((a, b) =>
        ordenNombre === 'az'
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre)
      );
    }

    setUsuariosFiltrados(filtrados);
  }, [nombreFiltro, rolFiltro, activosPrimero, ordenNombre, usuarios]);

  return (
    <div className="main-content">
      <h2>👥 Gestión de Usuarios</h2>

      <button
        className="create-user-btn"
        onClick={() => navigate('/usuarios/crear')}
      >
        ➕ Crear Usuario
      </button>

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
        </select>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={activosPrimero}
            onChange={(e) => setActivosPrimero(e.target.checked)}
          />
          Activos primero
        </label>

        <select value={ordenNombre} onChange={(e) => setOrdenNombre(e.target.value)}>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
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
                <button
                  className="delete-btn"
                  onClick={() => navigate(`/usuarios/eliminar/${user.id}`)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPanel;

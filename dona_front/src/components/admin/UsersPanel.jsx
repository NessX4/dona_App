/**
 * Responsable: Mariela Higuera
 * Descripción: Muestra la tabla de usuarios y permite acceder a sus acciones CRUD en el panel administrativo.
 */

import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';
import { useNavigate } from 'react-router-dom';

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
  const [ordenNombre, setOrdenNombre] = useState('az');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/usuarios/usuarios/');
        const data = await res.json();
        const usuariosSinAdmins = data.filter(user => user.rol !== 4);

        const [donadores, receptores, voluntarios] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/usuarios/donadores/').then(res => res.json()),
          fetch('http://127.0.0.1:8000/api/usuarios/receptores/').then(res => res.json()),
          fetch('http://127.0.0.1:8000/api/usuarios/voluntarios/').then(res => res.json())
        ]);

        const donadoresSet = new Set(donadores.map(d => d.usuario?.id));
        const receptoresSet = new Set(receptores.map(r => r.usuario?.id));
        const voluntariosSet = new Set(voluntarios.map(v => v.usuario?.id));

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
        setLoading(false);
      } catch (error) {
        console.error('❌ Error al obtener usuarios y entidades:', error);
        setLoading(false);
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
      
      <h2 style={{ marginTop: '10px' }}>
        <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
        Gestión de usuarios
      </h2>

      <button
        className="create-user-btn"
        onClick={() => navigate('/usuarios/crear')}
      >
        ➕ Crear usuario
      </button>

      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)}
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

        <select value={rolFiltro} onChange={(e) => setRolFiltro(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="1">Donador</option>
          <option value="2">Receptor</option>
          <option value="3">Voluntario</option>
        </select>

        Ordenar por:
        <select value={ordenNombre} onChange={(e) => setOrdenNombre(e.target.value)}>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

<div className="espaciado-negativo"></div>


      <table className="user-table">
  <thead>
    <tr>
      <th style={{ textAlign: 'center' }}>Nombre</th>
      <th style={{ textAlign: 'center' }}>Email</th>
      <th style={{ textAlign: 'center' }}>Tipo</th>
      <th style={{ textAlign: 'center' }}>Estado</th>
      <th style={{ textAlign: 'center' }}>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {loading ? (
      <tr>
        <td colSpan="5" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
          ⏳ Cargando usuarios...
        </td>
      </tr>
    ) : usuariosFiltrados.length === 0 ? (
      <tr>
        <td colSpan="5" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
          No hay coincidencias con los filtros aplicados.
        </td>
      </tr>
    ) : (
      usuariosFiltrados.map(user => (
        <tr key={user.id}>
          <td style={{ textAlign: 'center' }}>{user.nombre}</td>
          <td style={{ textAlign: 'center' }}>{user.correo}</td>
          <td style={{ textAlign: 'center' }}>{ROLES_MAP[user.rol] || 'Desconocido'}</td>
          <td style={{ textAlign: 'center' }}>
            <button
              className={user.activo ? 'estado-btn activo' : 'estado-btn inactivo'}
            >
              {user.activo ? '✅ Activo' : '⛔ Inactivo'}
            </button>
          </td>
          <td style={{ textAlign: 'center' }}>
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
      ))
    )}
  </tbody>
</table>
    </div>
  );
};

export default UsersPanel;

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
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/usuarios/usuarios/')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  return (
    <div className="main-content">
      <h2>👥 Gestión de Usuarios</h2>

      <button
  className="create-user-btn"
  onClick={() => navigate('/usuarios/crear')}
>
  ➕ Crear Usuario
</button>




      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{ROLES_MAP[user.rol] || 'Desconocido'}</td>
              <td>
                <button className="edit-btn">✏️ Editar</button>
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

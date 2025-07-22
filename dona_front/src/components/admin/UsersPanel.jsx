// src/components/admin/UsersPanel.jsx
import React, { useState } from 'react';
import '../../styles/admin.css';

const mockUsers = [
  { id: 1, nombre: 'Ana López', email: 'ana@dona.com', tipo: 'Donador' },
  { id: 2, nombre: 'Carlos Ruiz', email: 'carlos@volun.com', tipo: 'Voluntario' },
  { id: 3, nombre: 'Refugio Vida', email: 'vida@refugio.com', tipo: 'Refugio' },
  { id: 4, nombre: 'Merli Admin', email: 'admin@dona.com', tipo: 'Administrador' },
];

const UsersPanel = () => {
  const [usuarios, setUsuarios] = useState(mockUsers);

  return (
    <div className="main-content">
      <h2>👥 Gestión de Usuarios</h2>
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
              <td>{user.email}</td>
              <td>{user.tipo}</td>
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

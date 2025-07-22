// src/components/admin/AdminPanel.jsx
import React from 'react';
import Sidebar from './Sidebar'; // 👈 Asegúrate de importar el componente
import '../../styles/admin.css';

function AdminPanel() {
    return (
        <div className="admin-container">
            <Sidebar /> {/* 👈 Usa tu componente reutilizable */}

            <div className="main-panel">



                <div className="topbar">
                    <span className="topbar-title"></span>

                    <div className="topbar-right">
                        <span className="welcome-msg">👋 Bienvenid@ Administrador: ___________        </span>
                       <button className="logout-btn">
  <i className="bi bi-box-arrow-right" style={{ marginRight: '12px' }}></i>
  Cerrar sesión
</button>



                    </div>
                </div>


                <div className="main-content">
                    <h1>Se vienen cositas ...</h1>
                    <p>Aquí iran vainas :v</p>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;

import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar'; // ✅ ahora sí lo usamos
import '../../styles/admin.css';

function AdminPanel() {
return (
        <div className="admin-container">
            <Sidebar />
            <div className="main-panel">
                <Topbar /> {/* ✅ ahora sí renderiza el archivo correcto */}
                <div className="main-content">
                    <h1>Se vienen cositas ...</h1>
                    <p>Aquí iran vainas :v</p>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;

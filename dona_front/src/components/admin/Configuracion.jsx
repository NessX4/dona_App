import React, { useRef } from 'react';
import '../../styles/admin.css';

const Configuracion = () => {
  const fileInputRef = useRef(null);

  // ==========================
  // NUEVAS FUNCIONES BASE DE DATOS
  // ==========================

  // 📤 Exportar base de datos completa (.sql)
  const handleExportDatabase = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin-tools/export-db/', {
        method: 'GET',
        // credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al exportar la base de datos');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.sql';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert('No se pudo exportar la base de datos.');
    }
  };

  // 📥 Restaurar base de datos desde archivo
  const handleRestoreDatabase = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Selecciona un archivo .sql primero");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('http://localhost:8000/admin-tools/restore-db/', {
        method: 'POST',
        body: formData,
        // credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al restaurar la base de datos');
      alert('Base de datos restaurada correctamente');
      fileInputRef.current.value = null;
    } catch (error) {
      console.error(error);
      alert('No se pudo restaurar la base de datos.');
    }
  };

  // 🧹 Resetear base de datos (borrar datos y mantener estructura)
  const handleResetDatabase = async () => {
    if (!window.confirm('⚠️ Esto borrará TODOS los datos de la base de datos. ¿Continuar?')) return;

    try {
      const response = await fetch('http://localhost:8000/admin-tools/reset-db/', {
        method: 'GET',
        // credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al resetear la base de datos');
      alert('Base de datos reseteada correctamente');
    } catch (error) {
      console.error(error);
      alert('No se pudo resetear la base de datos.');
    }
  };

  // ==========================
  // FUNCIONES EXISTENTES (CSV)
  // ==========================
  const exportCSV = async (endpoint, filename, headers, rowMapper) => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();

      const csvRows = [headers.join(','), ...data.map(rowMapper)];
      const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exportando CSV:', error);
      alert('No se pudo exportar el archivo CSV.');
    }
  };

  // HANDLERS POR ROL
  const handleExportDonadores = () => {
    exportCSV(
      'http://localhost:8000/api/usuarios/donadores/',
      'donadores.csv',
      ['ID', 'Nombre del Lugar', 'Representante', 'Teléfono', 'Descripción', 'Horario Apertura', 'Horario Cierre'],
      d => [d.id, d.nombre_lugar, d.representante, d.telefono, d.descripcion, d.horario_apertura, d.horario_cierre].join(',')
    );
  };

  const handleExportVoluntarios = () => {
    exportCSV(
      'http://localhost:8000/api/usuarios/voluntarios/',
      'voluntarios.csv',
      ['ID', 'Teléfono', 'Zona ID', 'Usuario ID'],
      v => [v.id, v.telefono, v.zona_id, v.usuario_id].join(',')
    );
  };

  const handleExportReceptores = () => {
    exportCSV(
      'http://localhost:8000/api/usuarios/receptores/',
      'receptores.csv',
      ['ID', 'Nombre del Lugar', 'Encargado', 'Teléfono', 'Dirección', 'Capacidad', 'Horario Apertura', 'Horario Cierre'],
      r => [r.id, r.nombre_lugar, r.encargado, r.telefono, r.direccion, r.capacidad, r.horario_apertura, r.horario_cierre].join(',')
    );
  };

  // DONACIONES Y LOGÍSTICA
  const handleExportPublicaciones = () => {
    exportCSV(
      'http://localhost:8000/api/donaciones/publicaciones/',
      'publicaciones.csv',
      ['ID', 'Título', 'Descripción', 'Cantidad', 'Fecha Caducidad', 'Sucursal ID', 'Estado Donación'],
      p => [p.id, p.titulo, p.descripcion, p.cantidad, p.fecha_caducidad, p.sucursal, p.estado_donacion].join(',')
    );
  };

  const handleExportSolicitudes = () => {
    exportCSV(
      'http://localhost:8000/api/solicitudes/solicitudes/',
      'solicitudes.csv',
      ['ID', 'Publicación ID', 'Receptor ID', 'Voluntario ID', 'Estado Donación', 'Fecha', 'Comentarios'],
      s => [s.id, s.publicacion, s.receptor, s.voluntario, s.estado_donacion, s.fecha, s.comentarios].join(',')
    );
  };

  // ORGANIZACIÓN GEOGRÁFICA
  const handleExportZonas = () => {
    exportCSV(
      'http://localhost:8000/api/zonas/zonas/',
      'zonas.csv',
      ['ID', 'Nombre', 'Ciudad', 'Estado', 'Código Postal'],
      z => [z.id, z.nombre, z.ciudad, z.estado, z.codigo_postal].join(',')
    );
  };

  const handleExportSucursales = () => {
    exportCSV(
      'http://localhost:8000/api/donaciones/sucursales/',
      'sucursales.csv',
      ['ID', 'Nombre', 'Donador ID', 'Ubicación ID', 'Zona ID'],
      s => [s.id, s.nombre, s.donador, s.ubicacion, s.zona].join(',')
    );
  };

  // LOGS
  const handleExportLogs = () => {
    exportCSV(
      'http://localhost:8000/api/logs/',
      'logs.csv',
      ['ID', 'Acción', 'Modelo', 'Objeto ID', 'Fecha', 'Usuario'],
      log => [log.id, log.accion, log.modelo, log.objeto_id, log.fecha, log.usuario || '—'].join(',')
    );
  };

  // TABLA REUTILIZABLE
  const renderTabla = (titulo, filas) => (
    <div className="tarjeta-dashboard2">
      <h3>{titulo}</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Entidad</th>
            <th>Descripción</th>
            <th style={{ textAlign: 'center' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, idx) => (
            <tr key={idx}>
              <td><strong>{fila.nombre}</strong></td>
              <td>{fila.desc}</td>
              <td style={{ textAlign: 'center' }}>
                {fila.input ? (
                  <>
                    <input
                      type="file"
                      accept=".sql"
                      ref={fileInputRef}
                      style={{ marginRight: '10px' }}
                    />
                    <button className="exportar-btn" onClick={fila.onClick}> Restaurar</button>
                  </>
                ) : (
                  <button className="exportar-btn" onClick={fila.onClick}>{fila.boton || 'Exportar'}</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="main-content">
      <h2>⚙️ Panel de Configuración</h2>
      <p className="descripcion-config">
        Desde aquí puedes administrar exportaciones del sistema, respaldos y restauraciones de la base de datos.
      </p>

      {/* 💾 NUEVO PANEL BASE DE DATOS */}
      {renderTabla("💾 Base de Datos", [
        { nombre: 'Exportar BD', desc: 'Descarga un respaldo completo en formato .sql', onClick: handleExportDatabase, boton: 'Exportar' },
        { nombre: 'Restaurar BD', desc: 'Sube un archivo .sql para restaurar datos', onClick: handleRestoreDatabase, input: true },
        { nombre: 'Resetear BD', desc: 'Borra todos los datos, mantiene la estructura', onClick: handleResetDatabase, boton: 'Resetear' },
      ])}

      {/* 🧑‍🤝‍🧑 POR ROL */}
      {renderTabla("🧑‍🤝‍🧑 Usuarios por Rol", [
        { nombre: 'Donadores', desc: 'Entidades que publican donaciones', onClick: handleExportDonadores },
        { nombre: 'Voluntarios', desc: 'Personas que colaboran con el transporte', onClick: handleExportVoluntarios },
        { nombre: 'Receptores', desc: 'Refugios que reciben ayuda', onClick: handleExportReceptores },
      ])}

      {/* 📦 DONACIONES */}
      {renderTabla("📦 Donaciones y Logística", [
        { nombre: 'Publicaciones', desc: 'Donaciones activas en el sistema', onClick: handleExportPublicaciones },
        { nombre: 'Solicitudes', desc: 'Peticiones de entrega o retiro de ayuda', onClick: handleExportSolicitudes },
      ])}

      {/* 🌍 ZONAS */}
      {renderTabla("🌍 Organización Geográfica", [
        { nombre: 'Zonas', desc: 'Áreas operativas y sus códigos postales', onClick: handleExportZonas },
        { nombre: 'Sucursales', desc: 'Puntos físicos de los donadores', onClick: handleExportSucursales },
      ])}

      {/* 📝 LOGS */}
      {renderTabla("📝 Auditoría del Sistema", [
        { nombre: 'Logs', desc: 'Registro de acciones administrativas', onClick: handleExportLogs },
      ])}

      {/* 🔐 SEGURIDAD */}
      <div className="tarjeta-dashboard2">
        <h3>🔐 Seguridad</h3>
        <p>Muy pronto podrás cambiar tu contraseña, correo electrónico o cerrar sesiones activas.</p>
      </div>

      {/* 🎨 PERSONALIZACIÓN */}
      <div className="tarjeta-dashboard2">
        <h3>🎨 Personalización</h3>
        <p>Próximamente podrás elegir el tema visual e idioma preferido del panel.</p>
      </div>
    </div>
  );
};

export default Configuracion;

/**
 * Responsable: Mariela Higuera
 * Descripción: Panel principal con resumen visual de las entidades más recientes del sistema.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import fondoDecorativo1 from '../../assets/DonalogoHD.png';
import '../../styles/admin.css';

const Dashboard = () => {
  const [ultimoUsuario, setUltimoUsuario] = useState(null);
  const [ultimaPublicacion, setUltimaPublicacion] = useState(null);
  const [ultimaZona, setUltimaZona] = useState(null);
  const [ultimaSucursal, setUltimaSucursal] = useState(null);
  const [ultimaSolicitud, setUltimaSolicitud] = useState(null);
  const [ultimaNotificacion, setUltimaNotificacion] = useState(null);
  const [zonas, setZonas] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [estadosDonacion, setEstadosDonacion] = useState([]);

  const getRolNombre = (rolId) => {
    switch (rolId) {
      case 1: return 'Donador';
      case 2: return 'Voluntario';
      case 3: return 'Receptor';
      default: return 'Desconocido';
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/usuarios/usuarios/')
      .then(res => res.json())
      .then(data => {
        const usuariosValidos = data
          .filter(u => u.rol !== 4)
          .sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro));
        setUltimoUsuario(usuariosValidos[0] || null);
      });

    fetch('http://localhost:8000/api/donaciones/publicaciones/')
      .then(res => res.json())
      .then(data => {
        setPublicaciones(data);
        setUltimaPublicacion(data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))[0]);
      });

    fetch('http://localhost:8000/api/zonas/zonas/')
      .then(res => res.json())
      .then(data => {
        setZonas(data);
        setUltimaZona(data.sort((a, b) => b.id - a.id)[0]);
      });

    fetch('http://localhost:8000/api/donaciones/sucursales/')
      .then(res => res.json())
      .then(data => {
        setSucursales(data);
        setUltimaSucursal(data.sort((a, b) => b.id - a.id)[0]);
      });

    fetch('http://localhost:8000/api/solicitudes/solicitudes/')
      .then(res => res.json())
      .then(data => {
        setUltimaSolicitud(data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))[0]);
      });

    fetch('http://localhost:8000/api/notificaciones/notifiaciones/')
      .then(res => res.json())
      .then(data => {
        setUltimaNotificacion(data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0]);
      });

    fetch('http://localhost:8000/api/donaciones/estados/')
      .then(res => res.json())
      .then(data => setEstadosDonacion(data));
  }, []);

  const getZonaNombre = (zonaId) => {
    const zona = zonas.find(z => z.id === zonaId);
    return zona ? zona.nombre : 'Desconocida';
  };

  const getSucursalNombre = (sucursalId) => {
    const sucursal = sucursales.find(s => s.id === sucursalId);
    return sucursal ? sucursal.nombre : 'Desconocida';
  };

  const getPublicacionTitulo = (publicacionId) => {
    const pub = publicaciones.find(p => p.id === publicacionId);
    return pub ? pub.titulo : 'Desconocida';
  };

  const getEstadoNombre = (estadoId) => {
    const estado = estadosDonacion.find(e => e.id === parseInt(estadoId));
    return estado ? estado.nombre : 'Sin estado';
  };

  const Tarjeta = ({ titulo, contenido, link }) => (
    <div className="tarjeta-dashboard2">
      <h3>{titulo}</h3>
      <div className="contenido-tarjeta">{contenido}</div>
      <Link className="ver-mas-btn" to={link}>Ver más</Link>
    </div>
  );

  return (
    <div className="main-content fondo-decorado">
      <img src={fondoDecorativo1} alt="Decoración DonaApp" className="dashboard-logo-fondo" />
      <h2><i className="fas fa-chart-line" style={{ marginRight: '10px' }}></i> Dashboard general de Administración</h2>
      <p>Consulta los últimos registros del sistema y navega rápidamente hacia cada sección.</p>

      <div className="tarjetas-contenedor fila-superior">
        {ultimoUsuario && (
          <Tarjeta
      titulo={
        <>
          <i className="fas fa-user" style={{ marginRight: '8px', color: '#f39c12' }}></i>
          Último usuario registrado
        </>
      }
      contenido={
        <>
          <strong>Nombre:</strong> {ultimoUsuario.nombre}<br />
          <strong>Correo:</strong> {ultimoUsuario.correo}<br />
          <strong>Rol:</strong> {getRolNombre(ultimoUsuario.rol)}
        </>
      }
      link="/usuarios"
    />
        )}

        {ultimaZona && (
          <Tarjeta
      titulo={
        <>
          <i className="fas fa-map-marker-alt" style={{ marginRight: '8px', color: '#f39c12' }}></i>
          Zona más reciente
        </>
      }
      contenido={
        <>
          <strong>Nombre:</strong> {ultimaZona.nombre}<br />
          <strong>Estado:</strong> {ultimaZona.estado}
        </>
      }
      link="/zonas"
    />
        )}

        {ultimaSucursal && (
           <Tarjeta
      titulo={
        <>
          <i className="fas fa-store" style={{ marginRight: '8px', color: '#f39c12' }}></i>
          Última sucursal añadida
        </>
      }
      contenido={
        <>
          <strong>Nombre:</strong> {ultimaSucursal.nombre}<br />
          <strong>Zona:</strong> {getZonaNombre(ultimaSucursal.zona)}
        </>
      }
      link="/sucursales"
    
          />
        )}
      </div>

      <div className="tarjetas-contenedor fila-inferior">
        {ultimaPublicacion && (
            <Tarjeta
      titulo={
        <>
          <i className="fas fa-newspaper" style={{ marginRight: '8px', color: '#f39c12' }}></i>
          Publicación más reciente
        </>
      }
      contenido={
        <>
          <strong>Título:</strong> {ultimaPublicacion.titulo}<br />
          <strong>Sucursal:</strong> {getSucursalNombre(ultimaPublicacion.sucursal)}
        </>
      }
      link="/publicaciones"
    />
        )}

        {ultimaSolicitud && (
          <Tarjeta
      titulo={
        <>
          <i className="fas fa-envelope-open-text" style={{ marginRight: '8px', color: '#f39c12' }}></i>
          Solicitud más reciente
        </>
      }
      contenido={
        <>
          <strong>Publicación:</strong> {getPublicacionTitulo(ultimaSolicitud.publicacion)}<br />
          <strong>Estado:</strong> {getEstadoNombre(ultimaSolicitud.estado)}
        </>
      }
      link="/solicitudes"          />
        )}

        {ultimaNotificacion && (() => {
  const [mensajeTexto, usuarioTexto] = ultimaNotificacion.mensaje.split(':').map(s => s.trim());
  return (
    <Tarjeta
      titulo={
        <>
          <i className="fas fa-bell" style={{ marginRight: '8px', color: '#f39c12' }}></i>
          Última notificación
        </>
      }
      contenido={
        <>
          <strong>Mensaje:</strong> {mensajeTexto}<br />
          <strong>Usuario:</strong> {usuarioTexto || 'No especificado'}<br />
          <strong>Fecha:</strong> {new Date(ultimaNotificacion.fecha).toLocaleString()}
        </>
      }
      link="/notificaciones"
    />
  );
})()}

      </div>
    </div>
  );
};

export default Dashboard;

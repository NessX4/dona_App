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

  useEffect(() => {
    fetch('http://localhost:8000/api/usuarios/usuarios/')
      .then(res => res.json())
      .then(data => setUltimoUsuario(data.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))[0]));

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
      .then(data => setUltimaSolicitud(data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))[0]));

    fetch('http://localhost:8000/api/notificaciones/notifiaciones/')
      .then(res => res.json())
      .then(data => setUltimaNotificacion(data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0]));

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
    const estado = estadosDonacion.find(e => e.id === estadoId);
    return estado ? estado.nombre : 'Sin estado';
  };

  const Tarjeta = ({ titulo, contenido, link }) => (
    <div className="tarjeta-dashboard2">
      <h3>{titulo}</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{contenido}</p>
      <Link className="ver-mas-btn" to={link}>Ver más</Link>
    </div>
  );

  return (
    <div className="main-content fondo-decorado">
      <img
        src={fondoDecorativo1}
        alt="Decoración DonaApp"
        className="dashboard-logo-fondo"
      />

      <h2>📊 Dashboard general de Administración</h2>
      <p>Consulta los últimos registros del sistema y navega rápidamente hacia cada sección.</p>

      <div className="tarjetas-contenedor fila-superior">
        {ultimoUsuario && (
          <Tarjeta
            titulo="👤 Último Usuario Registrado"
            contenido={`Nombre: ${ultimoUsuario.nombre}\nCorreo: ${ultimoUsuario.correo}`}
            link="/usuarios"
          />
        )}
        {ultimaZona && (
          <Tarjeta
            titulo="🗺️ Zona Más Reciente"
            contenido={`Nombre: ${ultimaZona.nombre}\nEstado: ${ultimaZona.estado}`}
            link="/zonas"
          />
        )}
        {ultimaSucursal && (
          <Tarjeta
            titulo="🏬 Última Sucursal Añadida"
            contenido={`Nombre: ${ultimaSucursal.nombre}\nZona: ${getZonaNombre(ultimaSucursal.zona)}`}
            link="/sucursales"
          />
        )}
      </div>

      <div className="tarjetas-contenedor fila-inferior">
        {ultimaPublicacion && (
          <Tarjeta
            titulo="📦 Publicación Más Reciente"
            contenido={`Título: ${ultimaPublicacion.titulo}\nSucursal: ${getSucursalNombre(ultimaPublicacion.sucursal)}`}
            link="/publicaciones"
          />
        )}
        {ultimaSolicitud && (
          <Tarjeta
            titulo="📨 Solicitud Más Reciente"
            contenido={`Publicación: ${getPublicacionTitulo(ultimaSolicitud.publicacion)}\nEstado: ${getEstadoNombre(ultimaSolicitud.estado)}`}
            link="/solicitudes"
          />
        )}
        {ultimaNotificacion && (
          <Tarjeta
            titulo="🔔 Última Notificación"
            contenido={`Mensaje: ${ultimaNotificacion.mensaje}\nFecha: ${new Date(ultimaNotificacion.fecha).toLocaleString()}`}
            link="/notificaciones"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

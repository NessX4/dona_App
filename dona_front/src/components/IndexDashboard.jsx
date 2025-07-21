import React from "react";
import './index.css';
import logoDona from './assets/Dona.jpg';

export default function Dashboard() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logoDona} alt="Logo DONA" />
          <span>DONA</span>
        </div>
        <ul className="menu">
          <li className="active">
            <a href="/home">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="/donaciones/publicacion/create">
              <i className="fas fa-plus-circle"></i> Publicar Donación
            </a>
          </li>
          <li>
            <a href="/donaciones/publicacion/list">
              <i className="fas fa-donate"></i> Mis Donaciones
            </a>
          </li>
          <li>
            <a href="/perfil">
              <i className="fas fa-user"></i> Perfil
            </a>
          </li>
          <li>
            <a href="/notificaciones">
              <i className="fas fa-bell"></i> Notificaciones
            </a>
          </li>
          <li>
            <a href="/logout">
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <h1>Bienvenido, <span className="highlight">Restaurante Donador</span></h1>
          <div className="user-info">
            <img
              src="https://via.placeholder.com/40"
              alt="Usuario"
              className="user-avatar"
            />
            <span className="user-name">Usuario Ejemplo</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="stats">
            <div className="stat-card">
              <div className="stat-icon-container">
                <i className="fas fa-donate stat-icon"></i>
              </div>
              <div className="stat-text">
                <h3>15</h3>
                <p>Donaciones realizadas</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-container">
                <i className="fas fa-check-circle stat-icon"></i>
              </div>
              <div className="stat-text">
                <h3>12</h3>
                <p>Donaciones completadas</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-container">
                <i className="fas fa-users stat-icon"></i>
              </div>
              <div className="stat-text">
                <h3>8</h3>
                <p>Beneficiarios ayudados</p>
              </div>
            </div>
          </div>

          <h2>Tus donaciones recientes</h2>

          <div className="donations-grid">
            {[
              {
                title: "Panadería surtida",
                description: "Variedad de panes y pasteles en buen estado",
                time: "Hace 2 horas",
                distance: "5 km",
                badge: "Disponible",
                imageUrl: "https://via.placeholder.com/300x150"
              },
              {
                title: "Frutas frescas",
                description: "Variedad de frutas de temporada",
                time: "Hace 5 horas",
                distance: "3 km",
                badge: "Disponible",
                imageUrl: "https://via.placeholder.com/300x150"
              },
              {
                title: "Ensaladas listas",
                description: "Ensaladas completas para servir",
                time: "Ayer",
                distance: "2 km",
                badge: "En proceso",
                imageUrl: "https://via.placeholder.com/300x150"
              },
              {
                title: "Sopas congeladas",
                description: "Porciones individuales",
                time: "2 días",
                distance: "7 km",
                badge: "Completada",
                imageUrl: "https://via.placeholder.com/300x150"
              }
            ].map((donation, index) => (
              <div key={index} className="donation-card">
                <div
                  className="donation-image"
                  style={{ backgroundImage: `url(${donation.imageUrl})` }}
                >
                  <span className="donation-badge">{donation.badge}</span>
                </div>
                <div className="donation-content">
                  <h4>{donation.title}</h4>
                  <p className="donation-description">{donation.description}</p>
                  <div className="donation-meta">
                    <span><i className="fas fa-clock"></i> {donation.time}</span>
                    <span><i className="fas fa-map-marker-alt"></i> {donation.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="button-wrapper">
            <button
              className="main-button"
              onClick={() => window.location.href = '/PublicarDonacion.html'}
            >
              <i className="fas fa-plus"></i> Publicar nueva donación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

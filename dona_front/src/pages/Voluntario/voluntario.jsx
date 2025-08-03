// Luna FLores Yamileth Guadalupe
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoDona from "../../assets/Logotipo.png";
import "./voluntario.css";

const BienvenidaVoluntario = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    setModalOpen(true);
  };

  const confirmLogout = () => {
    setModalOpen(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  const cancelLogout = () => {
    setModalOpen(false);
  };

  return (
    <div className="bienvenida-voluntario">
      <div className="topbar">
        <p>Bienvenido, Voluntario - ¡Gracias por tu apoyo!</p>
      </div>

      <header>
        <div className="container">
          <div className="logo">
            <img src={logoDona} alt="Logo Dona" />
            <NavLink to="/voluntario" className="dona-text">
              DonaApp
            </NavLink>
          </div>
          <nav>
            <NavLink to="/donaciones/publicaciones">Donaciones</NavLink>
            <NavLink to="/solicitudes">Solicitudes</NavLink>
            <NavLink to="/donaciones/sucursales">Centros de Donación</NavLink>
            <NavLink to="/historial">Historial de Donaciones</NavLink>
            <NavLink to="/zonas/zonas">Zonas</NavLink>
            <NavLink to="/notificaciones">Alertas</NavLink>
            <NavLink to="/perfil">Mi Perfil</NavLink>
            <button onClick={handleLogout} className="donar-btn">
              Salir
            </button>
          </nav>
        </div>
      </header>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Estás seguro que deseas salir?</h3>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={confirmLogout}>
                Sí, salir
              </button>
              <button className="btn-cancel" onClick={cancelLogout}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="hero">
        <div className="hero-left">
          <h1>¡Bienvenido al Portal de Voluntarios!</h1>
          <p>
            Gracias por unirte a DONA. Tu labor como voluntario es fundamental
            para llevar apoyo a quienes más lo necesitan. Aquí podrás acceder a
            herramientas, información y recursos para potenciar tu ayuda.
          </p>

          <div className="course-info">
            <div>
              <strong>+100</strong>
              <span>Refugios conectados</span>
            </div>
            <div>
              <strong>+50</strong>
              <span>Centros de donación</span>
            </div>
            <div>
              <strong>+300</strong>
              <span>Voluntarios activos</span>
            </div>
            <div>
              <strong>$0</strong>
              <span>Costo por participar</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4149/4149674.png"
            alt="Ilustración Voluntariado"
          />
        </div>
      </main>

      <section className="features">
        <h2>¿A quién estás ayudando?</h2>
        <div className="feature-grid">
          <div className="feature-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3461/3461736.png"
              alt="Niños y Familias"
            />
            <h3>Niños y familias en situación vulnerable</h3>
          </div>
          <div className="feature-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
              alt="Red de Apoyo"
            />
            <h3>Refugios y centros comunitarios</h3>
          </div>
          <div className="feature-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3703/3703297.png"
              alt="Voluntarios"
            />
            <h3>Voluntarios con vocación de servicio</h3>
          </div>
        </div>
      </section>

      <section className="steps">
        <h2>¿Qué puedes hacer aquí?</h2>
        <div className="steps-grid">
          <div className="step-box">
            <h3>1. Consultar solicitudes</h3>
            <p>
              Revisa las necesidades de los refugios en tiempo real y apóyalas
              según tu zona.
            </p>
          </div>
          <div className="step-box">
            <h3>2. Ver centros cercanos</h3>
            <p>
              Ubica los centros de donación activos en tu región y mantente al
              tanto.
            </p>
          </div>
          <div className="step-box">
            <h3>3. Recibir alertas</h3>
            <p>
              Entérate al instante cuando haya emergencias o nuevas
              oportunidades de ayudar.
            </p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>Sobre este portal</h2>
        <div className="about-icon">🤝</div>
        <div className="about-text">
          <p>
            Este espacio fue creado para que los voluntarios tengan acceso fácil
            a toda la información relevante para su misión.
          </p>
          <p>
            Está pensado para ayudarte a organizar, comunicar y colaborar
            eficientemente.
          </p>
        </div>
      </section>

      <section className="security">
        <h2>Tu bienestar es lo primero</h2>
        <div className="security-icon">🛡️</div>
        <div className="security-text">
          <p>
            Queremos que te sientas seguro. Cada actividad cuenta con
            supervisión y un equipo de apoyo en caso de dudas o incidentes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BienvenidaVoluntario;

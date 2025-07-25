import React, { useEffect } from "react";
import './Home.css';
import { Link } from "react-router-dom";

// Importa AOS (animación)
import AOS from "aos";
import "aos/dist/aos.css";

// Importa FontAwesomeIcon para mostrar íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logoDona from "../assets/Dona.jpg";
import landingImage from "../assets/landing.jpg";


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Topbar */}
      <div className="topbar" data-aos="fade-down">
        <div className="container">
          <span>Contáctanos: +52 664 123 4567 | contacto@dona.org</span>
        </div>
      </div>

      {/* Header */}
      <header data-aos="fade-down" data-aos-delay="100">
        <div className="container header-left">
          <div className="logo">
            <img src={logoDona} alt="Logo DONA" />
            <span>DONA</span>
          </div>
          <nav>
            <a href="#inicio">Inicio</a>
            <a href="#campanas">Campañas</a>
            <a href="#funciona">Cómo Funciona</a>
            {/* <a href="#estadisticas">Regístrate como Refugio</a>
            <a href="#acerca">Regístrate como voluntario</a> */}
            <Link to="/login" className="donar-btn">DONA!</Link>
          </nav>
        </div>
      </header>

       <section
      className="hero hero-goza"
      id="inicio"
      data-aos="fade-up"
      style={{
        backgroundImage: `url(${landingImage})`,
      }}
      >
        <div className="overlay">
          <div className="container">
            <h1>Conectamos solidaridad con necesidad</h1>
            <p>Cada comida que se dona a través de DONA representa esperanza para quienes más lo necesitan.</p>
            <a href="/login" className="cta dark">Comenzar Donación</a>
          </div>
        </div>
      </section>
    );


      {/* Features */}
      <section className="features" id="campanas" data-aos="fade-up">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: 40, color: '#cc0000'}}>Nuestro impacto social</h2>
          <div className="feature-grid">
            <div className="feature-box" data-aos="zoom-in">
              <img src="/icons/no-waste.png" alt="Sin desperdicio" />
              <h3>Reducción del desperdicio</h3>
              <p>Aprovechamos excedentes de alimentos en buen estado que antes se desechaban.</p>
            </div>
            <div className="feature-box" data-aos="zoom-in" data-aos-delay="100">
              <img src="/icons/plate.png" alt="Alimentos" />
              <h3>Comidas para quienes lo necesitan</h3>
              <p>Entregamos alimentos directamente a organizaciones sociales y refugios.</p>
            </div>
            <div className="feature-box" data-aos="zoom-in" data-aos-delay="200">
              <img src="/icons/heart-hands.png" alt="Solidaridad" />
              <h3>Solidaridad en acción</h3>
              <p>Creamos una red de ayuda entre negocios locales y comunidades vulnerables.</p>
            </div>
            <div className="feature-box" data-aos="zoom-in" data-aos-delay="300">
              <img src="/icons/goal2.png" alt="ODS 2" />
              <h3>Hambre Cero (ODS 2)</h3>
              <p>Apoyamos el Objetivo de Desarrollo Sostenible #2 de las Naciones Unidas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="how-it-works" id="funciona" data-aos="fade-up">
        <div className="container">
          <h2>¿Cómo funciona DONA?</h2>
          <div className="steps-grid">
            <div className="step-box" data-aos="fade-up" data-aos-delay="100">
              <h3>1. Registro</h3>
              <p>Restaurantes, refugios y voluntarios crean una cuenta para comenzar a usar la plataforma.</p>
            </div>
            <div className="step-box" data-aos="fade-up" data-aos-delay="200">
              <h3>2. Publicación</h3>
              <p>Los restaurantes publican alimentos disponibles especificando cantidad, tipo y fecha límite.</p>
            </div>
            <div className="step-box" data-aos="fade-up" data-aos-delay="300">
              <h3>3. Solicitud</h3>
              <p>Refugios buscan donaciones según ubicación y necesidades, y hacen sus solicitudes.</p>
            </div>
            <div className="step-box" data-aos="fade-up" data-aos-delay="400">
              <h3>4. Entrega</h3>
              <p>Se genera un reporte de entrega que garantiza transparencia y seguimiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="stats" id="estadisticas" data-aos="fade-up">
        <div className="container stats-content">
          <div className="stats-text">
            <div className="circle" data-aos="zoom-in">
              <div className="percent">79%</div>
              <p>Recaudado</p>
            </div>
            <div className="stat-block" data-aos="fade-up" data-aos-delay="100">
              <h3>2,012+</h3>
              <p>Donaciones necesarias</p>
            </div>
            <div className="stat-block" data-aos="fade-up" data-aos-delay="200">
              <h3>281+</h3>
              <p>Donadores felices</p>
            </div>
          </div>
          <div className="stats-icon" data-aos="zoom-in" data-aos-delay="200">
            <FontAwesomeIcon icon="chart-line" />
          </div>
        </div>
      </section>

      {/* Acerca de DONA */}
      <section className="about" id="acerca" data-aos="fade-up">
        <div className="container about-content">
          <div className="about-icon" data-aos="zoom-in">
            <FontAwesomeIcon icon="people-roof" />
          </div>
          <div className="about-text">
            <h2>¿Qué es DONA?</h2>
            <p>
              DONA (Distribución Organizada de Nutrición Alimentaria) es una plataforma web que conecta a restaurantes con excedentes de alimentos con refugios y organizaciones sociales que los necesitan. Nuestro propósito es reducir el desperdicio alimentario y apoyar a comunidades vulnerables, promoviendo el Objetivo de Desarrollo Sostenible #2: Hambre Cero.
            </p>
            <p>
              Con funciones como registro de usuarios, publicación de donaciones, historial de entregas, panel de administración y sistema de notificaciones, DONA busca garantizar una experiencia segura, eficiente y transparente para todos los involucrados.
            </p>
          </div>
        </div>
      </section>

      {/* Seguridad */}
      <section className="security" data-aos="fade-left">
        <div className="container security-content">
          <div className="security-text">
            <h2>Seguridad y Confianza</h2>
            <p>
              DONA garantiza seguridad mediante autenticación cifrada, gestión segura de sesiones, y transmisión de datos encriptados. Prohibimos el uso comercial de las donaciones, y cumplimos con las normas locales e internacionales de higiene y seguridad alimentaria.
            </p>
          </div>
          <div className="security-icon" data-aos="zoom-in" data-aos-delay="200">
            <FontAwesomeIcon icon="shield-halved" />
          </div>
        </div>
      </section>

      {/* Donar */}
      <section className="donate" id="donar" data-aos="fade-up">
        <div className="container">
          <h2>¿Listo para ayudar?</h2>
          <a href="/login" className="donar-btn">Haz tu donación</a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© 2025 DONA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

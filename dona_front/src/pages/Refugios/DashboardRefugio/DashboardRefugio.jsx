import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoDona from "../../../assets/Logotipo.png";
import RefugioHeader from "../../../components/RefugioHeader"; // ya está bien importado
import "./DashboardRefugio.css";

const DashboardRefugio = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <RefugioHeader /> {/* ← Aquí se añade el Header */}
      <div className="bienvenida-refugio">
        <main className="hero">
          <div className="hero-left">
            <h1>¡Bienvenido al Panel del Refugio!</h1>
            <p>
              Gracias por formar parte de DONA. Este espacio está diseñado para
              ayudarte a gestionar tus necesidades, coordinar donaciones y estar
              en contacto con voluntarios que desean ayudar.
            </p>

            <div className="course-info">
              <div>
                <strong>+500</strong>
                <span>Donaciones realizadas</span>
              </div>
              <div>
                <strong>+100</strong>
                <span>Voluntarios conectados</span>
              </div>
              <div>
                <strong>+200</strong>
                <span>Solicitudes gestionadas</span>
              </div>
              <div>
                <strong>0$</strong>
                <span>Costo por usar la plataforma</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5997/5997685.png"
              alt="Ilustración Refugio"
            />
          </div>
        </main>

        <section className="features">
          <h2>¿Cómo ayuda DONA a tu refugio?</h2>
          <div className="feature-grid">
            <div className="feature-box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2636/2636289.png"
                alt="Solicitudes"
              />
              <h3>Gestiona tus solicitudes de ayuda fácilmente</h3>
            </div>
            <div className="feature-box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/10880/10880144.png"
                alt="Donaciones"
              />
              <h3>Recibe donaciones de forma organizada</h3>
            </div>
            <div className="feature-box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/944/944846.png"
                alt="Comunicación"
              />
              <h3>Comunícate con voluntarios en tu zona</h3>
            </div>
          </div>
        </section>

        <section className="steps">
          <h2>¿Qué puedes hacer aquí?</h2>
          <div className="steps-grid">
            <div className="step-box">
              <h3>1. Publicar necesidades</h3>
              <p>
                Crea solicitudes detalladas de lo que tu refugio requiere para
                ser atendido rápidamente.
              </p>
            </div>
            <div className="step-box">
              <h3>2. Confirmar entregas</h3>
              <p>
                Marca como recibidas las donaciones y da seguimiento al
                historial.
              </p>
            </div>
            <div className="step-box">
              <h3>3. Colaborar con voluntarios</h3>
              <p>Recibe ayuda de personas comprometidas con tu causa.</p>
            </div>
          </div>
        </section>

        <section className="about">
          <h2>Sobre esta plataforma</h2>
          <div className="about-icon">🏠</div>
          <div className="about-text">
            <p>
              Este espacio fue diseñado para apoyar a los refugios como el tuyo,
              facilitando la conexión con quienes desean ayudar.
            </p>
            <p>
              La gestión eficiente y la transparencia son nuestra prioridad.
            </p>
          </div>
        </section>

        <section className="security">
          <h2>Seguridad y confianza</h2>
          <div className="security-icon">🔐</div>
          <div className="security-text">
            <p>
              Toda interacción está protegida y monitoreada para garantizar un
              ambiente seguro para todos.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardRefugio;

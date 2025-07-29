// Luna FLores Yamileth Guadalupe
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoDona from "../../assets/Logotipo.png";
import "./Donadores.css";

const Donadores = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        setModalOpen(true);
    };

    const confirmLogout = () => {
        setModalOpen(false);
        // Aquí limpias tokens o sesión si usas
        navigate("/");
    };

    const cancelLogout = () => {
        setModalOpen(false);
    };

    return (
        <div className="bienvenida-donador">
            <div className="topbar">
                <p>Bienvenido, Donador - ¡Gracias por tu generosidad!</p>
            </div>

            <header>
                <div className="container">
                    <div className="logo">
                        <img src={logoDona} alt="Logo Dona" />
                        <NavLink to="/donadores" className="dona-text">
                            DonaApp
                        </NavLink>
                    </div>
                    <nav>
                        <NavLink to="/donadores/donaciones">Mis Donaciones</NavLink>
                        <NavLink to="/donadores/nueva-donacion">Nueva Donación</NavLink>
                        <NavLink to="/donadores/solicitudes">Solicitudes</NavLink>
                        <NavLink to="/donadores/notificaciones">Notificaciones</NavLink>                         
                       <NavLink to="/donadores/perfil">Mi Perfil</NavLink>
                        <button onClick={handleLogout} className="donar-btn">
                            Salir
                        </button>
                    </nav>
                </div>
            </header>

            {/* Modal Confirmación Salir */}
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
                    <h1>¡Bienvenido al Portal de Donadores!</h1>
                    <p>
                        Gracias por sumarte a nuestra red de sucursales y restaurantes que
                        donan comida para quienes más lo necesitan. Aquí podrás gestionar
                        tus donaciones, revisar solicitudes y mantenerte informado.
                    </p>

                    <div className="course-info">
                        <div>
                            <strong>+80</strong>
                            <span>Sucursales activas</span>
                        </div>
                        <div>
                            <strong>+1200</strong>
                            <span>Donaciones realizadas</span>
                        </div>
                        <div>
                            <strong>+350</strong>
                            <span>Solicitudes atendidas</span>
                        </div>
                        <div>
                            <strong>$0</strong>
                            <span>Costos por participar</span>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8140/8140417.png"
                        alt="Ilustración Donación de Comida"
                    />
                </div>
            </main>

            <section className="features">
                <h2>¿A quién ayudas con tu donación?</h2>
                <div className="feature-grid">
                    <div className="feature-box">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
                            alt="Personas necesitadas"
                        />
                        <h3>Niños, familias y personas en situación vulnerable</h3>
                    </div>
                    <div className="feature-box">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/167/167707.png"
                            alt="Refugios y centros comunitarios"
                        />
                        <h3>Refugios y centros comunitarios</h3>
                    </div>
                    <div className="feature-box">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                            alt="Red de donadores"
                        />
                        <h3>Red de sucursales y restaurantes solidarios</h3>
                    </div>
                </div>
            </section>

            <section className="steps">
                <h2>¿Qué puedes hacer aquí?</h2>
                <div className="steps-grid">
                    <div className="step-box">
                        <h3>1. Registrar donaciones</h3>
                        <p>
                            Publica las donaciones de comida que tu sucursal/restaurante puede
                            ofrecer en tiempo real.
                        </p>
                    </div>
                    <div className="step-box">
                        <h3>2. Atender solicitudes</h3>
                        <p>
                            Revisa y responde solicitudes de organizaciones que necesitan tu
                            ayuda.
                        </p>
                    </div>
                    <div className="step-box">
                        <h3>3. Mantente informado</h3>
                        <p>
                            Recibe notificaciones y alertas importantes para gestionar tus
                            donaciones eficazmente.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about">
                <h2>Sobre este portal</h2>
                <div className="about-icon">🍽️</div>
                <div className="about-text">
                    <p>
                        Este espacio fue diseñado para que las sucursales y restaurantes
                        gestionen sus donaciones de manera sencilla y organizada.
                    </p>
                    <p>
                        Queremos facilitar el proceso para que la comida llegue rápido a quienes la necesitan.
                    </p>
                </div>
            </section>

            <section className="security">
                <h2>Tu compromiso es valioso</h2>
                <div className="security-icon">🤝</div>
                <div className="security-text">
                    <p>
                        Valoramos tu generosidad y nos aseguramos de que cada donación sea registrada y aprovechada correctamente.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Donadores;

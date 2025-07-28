import React, { useState, useEffect } from "react";
import DonadoresHeader from "../../../components/DonadoresHeader";
import "./PerfilDonador.css";
import FotoVoluntario from "../../../assets/FotoVoluntario.avif";

const PerfilDonador = () => {
    const [perfil, setPerfil] = useState(null);
    const [editarVisible, setEditarVisible] = useState(false);
    const [formData, setFormData] = useState({
        usuario: "",
        nombreLugar: "",
        representante: "",
        telefono: "",
        descripcion: "",
        horarioApertura: "",
        horarioCierre: "",
    });

    useEffect(() => {
        // Simula carga de datos desde backend o API
        setTimeout(() => {
            const datos = {
                usuario: "donador123",
                nombreLugar: "Restaurante La Buena Mesa",
                representante: "Carlos Pérez",
                telefono: "987-654-3210",
                descripcion: "Comida casera y donaciones semanales",
                horarioApertura: "08:00",
                horarioCierre: "20:00",
            };
            setPerfil(datos);
            setFormData(datos);
        }, 1000);
    }, []);

    const handleEditar = () => setEditarVisible(true);
    const handleCerrar = () => setEditarVisible(false);

    const handleCambio = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardar = (e) => {
        e.preventDefault();
        // Aquí guardas el formulario (API o backend)
        setPerfil(formData);
        setEditarVisible(false);
    };

    return (
        <>
            <DonadoresHeader />
            <main className="perfil-donador-container">
                <h1 className="perfil-donador-title">
                    Mi perfil{perfil ? ` - ${perfil.nombreLugar}` : ""}
                </h1>

                {!perfil ? (
                    <p className="loading">Cargando perfil...</p>
                ) : (
                    <>
                        {!editarVisible ? (
                            <>
                                <div className="perfil-card">
                                    <img
                                        src={FotoVoluntario}
                                        alt="Foto del Donador"
                                        className="foto-voluntario"
                                    />
                                    <div className="campo-perfil">
                                        <label>Usuario</label>
                                        <p className="valor-perfil">{perfil.usuario}</p>
                                    </div>
                                    <div className="campo-perfil">
                                        <label>Nombre lugar</label>
                                        <p className="valor-perfil">{perfil.nombreLugar}</p>
                                    </div>
                                    <div className="campo-perfil">
                                        <label>Representante</label>
                                        <p className="valor-perfil">{perfil.representante}</p>
                                    </div>
                                    <div className="campo-perfil">
                                        <label>Teléfono</label>
                                        <p className="valor-perfil">{perfil.telefono}</p>
                                    </div>
                                    <div className="campo-perfil">
                                        <label>Descripción</label>
                                        <p className="valor-perfil">{perfil.descripcion}</p>
                                    </div>
                                    <div className="campo-perfil">
                                        <label>Horario apertura</label>
                                        <p className="valor-perfil">{perfil.horarioApertura}</p>
                                    </div>
                                    <div className="campo-perfil">
                                        <label>Horario cierre</label>
                                        <p className="valor-perfil">{perfil.horarioCierre}</p>
                                    </div>
                                </div>
                                <button className="btn-editar" onClick={handleEditar}>
                                    Editar perfil
                                </button>
                            </>
                        ) : (
                            <div className="modal-overlay" onClick={handleCerrar}>
                                <div
                                    className="modal-content"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h2>Editar perfil</h2>
                                    <form onSubmit={handleGuardar} className="form-editar">
                                        <label>
                                            Usuario:
                                            <input
                                                type="text"
                                                name="usuario"
                                                value={formData.usuario}
                                                onChange={handleCambio}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Nombre lugar:
                                            <input
                                                type="text"
                                                name="nombreLugar"
                                                value={formData.nombreLugar}
                                                onChange={handleCambio}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Representante:
                                            <input
                                                type="text"
                                                name="representante"
                                                value={formData.representante}
                                                onChange={handleCambio}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Teléfono:
                                            <input
                                                type="tel"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleCambio}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Descripción:
                                            <textarea
                                                name="descripcion"
                                                value={formData.descripcion}
                                                onChange={handleCambio}
                                                rows={3}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Horario apertura:
                                            <input
                                                type="time"
                                                name="horarioApertura"
                                                value={formData.horarioApertura}
                                                onChange={handleCambio}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Horario cierre:
                                            <input
                                                type="time"
                                                name="horarioCierre"
                                                value={formData.horarioCierre}
                                                onChange={handleCambio}
                                                required
                                            />
                                        </label>
                                        <div className="modal-buttons">
                                            <button type="submit" className="btn-guardar">
                                                Guardar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-cancelar"
                                                onClick={handleCerrar}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default PerfilDonador;

// Luna FLores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import "./Login.css";
import logoDona from "../../assets/Logotipo.png";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
  // Estados del modal y formularios
  const [modalOpen, setModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null); // "donador", "refugio", "voluntario", "recuperar"

  // Estados para las zonas
  const [zonas, setZonas] = useState([]);
  const [cargandoZonas, setCargandoZonas] = useState(true);
  const [errorZonas, setErrorZonas] = useState(null);

  // Estados para recuperación de contraseña
  const [recuperarCorreo, setRecuperarCorreo] = useState("");

  // Datos comunes para todos los usuarios
  const [usuarioForm, setUsuarioForm] = useState({
    nombre: "",
    correo: "",
    password: "",
  });

    const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/usuarios/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: usuarioForm.correo,
          password: usuarioForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Credenciales incorrectas");
      }

      // Guardar en localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("usuarioId", data.usuario_id);
      localStorage.setItem("rol", data.rol);

      // Redirección por rol usando navigate
      if (data.rol === "Donador") {
        navigate("/donadores");
      } else if (data.rol === "Refugio") {
        navigate("/refugio/dashboard");
      } else if (data.rol === "Voluntario") {
        navigate("/voluntario");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
      console.error("Error en login:", err);
    }
  };

  // Datos específicos para cada tipo de usuario
  const [donadorForm, setDonadorForm] = useState({
    nombrelugar: "",
    representante: "",
    telefono: "",
    descripcion: "",
    horarioapertura: "",
    horariocierre: "",
  });

  const [refugioForm, setRefugioForm] = useState({
    nombre: "",
    encargado: "",
    telefono: "",
    direccion: "",
    capacidad: "",
    horarioapertura: "",
    horariocierre: "",
    zona_id: "",
  });

  const [voluntarioForm, setVoluntarioForm] = useState({
    telefono: "",
    zona_id: "",
  });

  // Cargar zonas al iniciar
  useEffect(() => {
    const cargarZonas = async () => {
      try {
        console.log("Cargando zonas...");
        const respuesta = await fetch("http://localhost:8000/api/zonas/zonas/");
        
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        console.log("Zonas recibidas:", datos);
        
        if (!Array.isArray(datos)) {
          throw new Error("La API no devolvió un array de zonas");
        }
        
        setZonas(datos);
        setErrorZonas(null);
      } catch (error) {
        console.error("Error cargando zonas:", error);
        setErrorZonas(error.message);
        setZonas([]);
      } finally {
        setCargandoZonas(false);
      }
    };
    
    cargarZonas();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e, setForm, formState) => {
    const { name, value } = e.target;
    setForm({ ...formState, [name]: value });
  };

  // Registrar donador
  const handleDonadorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/usuarios/donadores/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: {
            nombre: usuarioForm.nombre,
            correo: usuarioForm.correo,
            password: usuarioForm.password,
            rol: 1,
          },
          donador: { ...donadorForm },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar donador");
      }
      
      alert("Restaurante registrado con éxito");
      resetForms();
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  // Registrar refugio
  const handleRefugioSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/usuarios/refugios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: {
            nombre: usuarioForm.nombre,
            correo: usuarioForm.correo,
            password: usuarioForm.password,
            rol: 2,
          },
          refugio: { ...refugioForm },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar refugio");
      }
      
      alert("Refugio registrado con éxito");
      resetForms();
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  // Registrar voluntario
  const handleVoluntarioSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!voluntarioForm.zona_id) {
        throw new Error("Por favor selecciona una zona");
      }
      
      const response = await fetch("http://localhost:8000/api/usuarios/voluntarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: {
            nombre: usuarioForm.nombre,
            correo: usuarioForm.correo,
            password: usuarioForm.password,
            rol: 3,
          },
          voluntario: { ...voluntarioForm },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar voluntario");
      }
      
      alert("Voluntario registrado con éxito");
      resetForms();
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  // Recuperar contraseña
  const handleRecuperarSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/recuperar-contrasena/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: recuperarCorreo }),
      });
      
      if (!response.ok) {
        throw new Error("Error al enviar solicitud de recuperación");
      }
      
      alert("Si el correo existe, recibirás un enlace para recuperar tu contraseña");
      setRecuperarCorreo("");
      setModalOpen(false);
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  // Limpiar todos los formularios
  const resetForms = () => {
    setUsuarioForm({ nombre: "", correo: "", password: "" });
    setDonadorForm({
      nombrelugar: "",
      representante: "",
      telefono: "",
      descripcion: "",
      horarioapertura: "",
      horariocierre: "",
    });
    setRefugioForm({
      nombre: "",
      encargado: "",
      telefono: "",
      direccion: "",
      capacidad: "",
      horarioapertura: "",
      horariocierre: "",
      zona_id: "",
    });
    setVoluntarioForm({ telefono: "", zona_id: "" });
    setActiveForm(null);
    setModalOpen(false);
  };

  // Componente para mostrar el selector de zonas
  const SelectorZonas = () => (
    <select
      name="zona_id"
      value={activeForm === "refugio" ? refugioForm.zona_id : voluntarioForm.zona_id}
      onChange={(e) => 
        activeForm === "refugio" 
          ? handleChange(e, setRefugioForm, refugioForm)
          : handleChange(e, setVoluntarioForm, voluntarioForm)
      }
      required
      disabled={cargandoZonas || errorZonas}
      style={{ marginBottom: "10px" }}
    >
      <option value="">Selecciona tu zona</option>
      
      {cargandoZonas ? (
        <option disabled>Cargando zonas...</option>
      ) : errorZonas ? (
        <option disabled>Error: {errorZonas}</option>
      ) : zonas.length === 0 ? (
        <option disabled>No hay zonas disponibles</option>
      ) : (
        zonas.map((zona) => (
          <option key={zona.id} value={zona.id}>
            {zona.nombre} ({zona.ciudad})
          </option>
        ))
      )}
    </select>
  );

  return (
    <div className="login-outer">
      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <img src={logoDona} alt="Logo DONA" />
            <h1 className="titulo-dona">DONA</h1>
          </div>

          <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              required
              value={usuarioForm.correo}
              onChange={(e) => setUsuarioForm({...usuarioForm, correo: e.target.value})}
            />
            
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              required
              value={usuarioForm.password}
              onChange={(e) => setUsuarioForm({...usuarioForm, password: e.target.value})}
            />
            
            <div className="forgot">
              <button 
                type="button" 
                className="link-button"
                onClick={() => { setActiveForm("recuperar"); setModalOpen(true); }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            
            <button type="submit">Iniciar Sesión</button>
          </form>

          <div className="register-link">
            ¿No tienes una cuenta?{" "}
            <button className="link-button" onClick={() => setModalOpen(true)}>
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {activeForm === "recuperar" ? (
              <>
                <h3>Recuperar Contraseña</h3>
                <form onSubmit={handleRecuperarSubmit}>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={recuperarCorreo}
                    onChange={(e) => setRecuperarCorreo(e.target.value)}
                    required
                  />
                  <button type="submit">Enviar enlace de recuperación</button>
                </form>
                <button 
                  className="close-btn"
                  onClick={() => setActiveForm(null)}
                >
                  ← Regresar
                </button>
              </>
            ) : !activeForm ? (
              <>
                <h3>¿Cómo quieres registrarte?</h3>
                <button onClick={() => setActiveForm("donador")}>Restaurante</button>
                <button onClick={() => setActiveForm("refugio")}>Refugio</button>
                <button onClick={() => setActiveForm("voluntario")}>Voluntario</button>
                <button 
                  className="close-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Cerrar
                </button>
              </>
            ) : (
              <>
                <form onSubmit={
                  activeForm === "donador" ? handleDonadorSubmit :
                  activeForm === "refugio" ? handleRefugioSubmit :
                  handleVoluntarioSubmit
                }>
                  <h3>
                    Registro {activeForm === "donador" ? "Restaurante" : 
                    activeForm === "refugio" ? "Refugio" : "Voluntario"}
                  </h3>

                  <input
                    name="nombre"
                    placeholder="Nombre completo"
                    value={usuarioForm.nombre}
                    onChange={(e) => handleChange(e, setUsuarioForm, usuarioForm)}
                    required
                  />
                  
                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo electrónico"
                    value={usuarioForm.correo}
                    onChange={(e) => handleChange(e, setUsuarioForm, usuarioForm)}
                    required
                  />
                  
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña (mínimo 8 caracteres)"
                    value={usuarioForm.password}
                    onChange={(e) => handleChange(e, setUsuarioForm, usuarioForm)}
                    required
                    minLength={8}
                  />

                  {activeForm === "donador" && (
                    <>
                      <input
                        name="nombrelugar"
                        placeholder="Nombre del restaurante"
                        value={donadorForm.nombrelugar}
                        onChange={(e) => handleChange(e, setDonadorForm, donadorForm)}
                        required
                      />
                      
                      <input
                        name="representante"
                        placeholder="Nombre del representante"
                        value={donadorForm.representante}
                        onChange={(e) => handleChange(e, setDonadorForm, donadorForm)}
                        required
                      />
                      
                      <input
                        name="telefono"
                        placeholder="Teléfono"
                        value={donadorForm.telefono}
                        onChange={(e) => handleChange(e, setDonadorForm, donadorForm)}
                        required
                      />
                      
                      <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={donadorForm.descripcion}
                        onChange={(e) => handleChange(e, setDonadorForm, donadorForm)}
                        required
                      />
                      
                      <div className="time-inputs">
                        <label>Horario de apertura:</label>
                        <input
                          type="time"
                          name="horarioapertura"
                          value={donadorForm.horarioapertura}
                          onChange={(e) => handleChange(e, setDonadorForm, donadorForm)}
                          required
                        />
                        
                        <label>Horario de cierre:</label>
                        <input
                          type="time"
                          name="horariocierre"
                          value={donadorForm.horariocierre}
                          onChange={(e) => handleChange(e, setDonadorForm, donadorForm)}
                          required
                        />
                      </div>
                    </>
                  )}

                  {activeForm === "refugio" && (
                    <>
                      <input
                        name="nombre"
                        placeholder="Nombre del refugio"
                        value={refugioForm.nombre}
                        onChange={(e) => handleChange(e, setRefugioForm, refugioForm)}
                        required
                      />
                      
                      <input
                        name="encargado"
                        placeholder="Encargado"
                        value={refugioForm.encargado}
                        onChange={(e) => handleChange(e, setRefugioForm, refugioForm)}
                        required
                      />
                      
                      <input
                        name="telefono"
                        placeholder="Teléfono"
                        value={refugioForm.telefono}
                        onChange={(e) => handleChange(e, setRefugioForm, refugioForm)}
                        required
                      />
                      
                      <input
                        name="direccion"
                        placeholder="Dirección"
                        value={refugioForm.direccion}
                        onChange={(e) => handleChange(e, setRefugioForm, refugioForm)}
                        required
                      />
                      
                      <input
                        name="capacidad"
                        placeholder="Capacidad"
                        value={refugioForm.capacidad}
                        onChange={(e) => handleChange(e, setRefugioForm, refugioForm)}
                        required
                      />
                      
                      <div className="time-inputs">
                        <label>Horario de apertura:</label>
                        <input
                          type="time"
                          name="horarioapertura"
                          value={refugioForm.horarioapertura}
                          onChange={(e) => handleChange(e, setRefugioForm, refugioForm)}
                          required
                        />
                        
                        <label>Horario de cierre:</label>
                        <input
                          type="time"
                          name="horariocierre"
                          value={refugioForm.horariocierre}
                          onChange={(e) => handleChange(e, setRefugioForm, refugioForm)}
                          required
                        />
                      </div>
                      
                      <SelectorZonas />
                    </>
                  )}

                  {activeForm === "voluntario" && (
                    <>
                      <input
                        name="telefono"
                        placeholder="Teléfono"
                        value={voluntarioForm.telefono}
                        onChange={(e) => handleChange(e, setVoluntarioForm, voluntarioForm)}
                        required
                      />
                      
                      <SelectorZonas />
                    </>
                  )}
                  
                  <button type="submit">Registrar</button>
                </form>
                
                <button 
                  className="close-btn"
                  onClick={() => setActiveForm(null)}
                >
                  ← Regresar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
/**
 * Responsable: Mariela Higuera
 * Descripción: Formulario para registrar usuarios de diferentes roles dentro del sistema.
 */

import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';
import fondoDecorativo from '../../assets/DonalogoHD.png';

const CreateUser = () => {
  const [zonas, setZonas] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    rol: '',
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',

    nombre_lugar: '',
    representante: '',
    telefono: '',
    descripcion: '',
    horario_apertura: '',
    horario_cierre: '',

    encargado: '',
    direccion: '',
    capacidad: '',

    zona_id: ''
  });

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/zonas/zonas/');
        const data = await res.json();
        const zonasActivas = data.filter(z => !z.nombre.toLowerCase().includes('inactiva'));
        setZonas(zonasActivas);
      } catch (err) {
        console.error('Error al cargar zonas:', err);
      }
    };
    fetchZonas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{1,20}$/;

    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.correo || !emailRegex.test(formData.correo)) newErrors.correo = "Correo inválido";
    if (!formData.password || !passwordRegex.test(formData.password))
      newErrors.password = "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (formData.telefono && !phoneRegex.test(formData.telefono))
      newErrors.telefono = "Solo números, hasta 20 dígitos";
    if (formData.rol === '2' && (!formData.capacidad || parseInt(formData.capacidad) <= 0))
      newErrors.capacidad = "Debe ser un número positivo";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.keys(newErrors)[0];
      const errorField = document.querySelector(`[name="${firstError}"]`);
      if (errorField) errorField.focus();
      return;
    }

    setErrors({}); // limpiar errores

    const usuarioBase = {
      nombre: formData.nombre,
      correo: formData.correo,
      password: formData.password,
      rol: parseInt(formData.rol)
    };

    const endpointMap = {
      '1': 'donadores',
      '2': 'receptores',
      '3': 'voluntarios'
    };

    const endpoint = endpointMap[formData.rol];

    const basePayload = {
      usuario: usuarioBase,
      telefono: formData.telefono
    };

    if (formData.rol === '1') {
      Object.assign(basePayload, {
        nombre_lugar: formData.nombre_lugar,
        representante: formData.representante,
        descripcion: formData.descripcion,
        horario_apertura: formData.horario_apertura,
        horario_cierre: formData.horario_cierre
      });
    }

    if (formData.rol === '2') {
      Object.assign(basePayload, {
        nombre_lugar: formData.nombre_lugar,
        encargado: formData.encargado,
        direccion: formData.direccion,
        capacidad: parseInt(formData.capacidad),
        horario_apertura: formData.horario_apertura,
        horario_cierre: formData.horario_cierre
      });
    }

    if (formData.rol === '3') {
      Object.assign(basePayload, {
        zona: parseInt(formData.zona_id)
      });
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/usuarios/${endpoint}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basePayload)
      });

      const data = await res.json();

      if (!res.ok) {
  const backendErrors = {};

  for (const key in data) {
    if (Array.isArray(data[key])) {
      if (key === "correo") backendErrors.correo = "El correo ya está registrado o es inválido";
      else if (key === "telefono") backendErrors.telefono = "El teléfono es obligatorio";
      else backendErrors[key] = data[key][0];  // Mensaje genérico por si acaso
    }
  }

  setErrors(backendErrors);
  const firstError = Object.keys(backendErrors)[0];
  const errorField = document.querySelector(`[name="${firstError}"]`);
  if (errorField) errorField.focus();
  return;
}


      alert('¡Registro creado con éxito!');
      window.location.href = '/admin/#/usuarios';
    } catch (err) {
      setErrors({ general: 'Error inesperado: ' + err.message });
    }
  };

  return (
    <div className="main-content" style={{ position: 'relative' }}>
      <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
      <h2 className="titulo-principal">➕ Crear nuevo usuario</h2>
      <div className="edit-card compacta">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label>Rol:</label>
            <select name="rol" value={formData.rol} onChange={handleChange} required>
              <option value="">Selecciona un rol</option>
              <option value="1">Donador</option>
              <option value="2">Receptor</option>
              <option value="3">Voluntario</option>
            </select>
          </div>

          {/* Campos comunes */}
          {[
            { label: 'Nombre', name: 'nombre' },
            { label: 'Correo', name: 'correo', type: 'email' },
            { label: 'Contraseña', name: 'password', type: 'password' },
            { label: 'Confirmar Contraseña', name: 'confirmPassword', type: 'password' },
          ].map(({ label, name, type = 'text' }) => (
            <div className="form-group" key={name}>
              <label>{label}:</label>
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                className={errors[name] ? 'input-error' : ''}
              />
              {errors[name] && <div className="error-text">{errors[name]}</div>}
            </div>
          ))}

          {/* Campos específicos */}
          {formData.rol === '1' && (
            <>
              <div className="form-group">
                <label>Nombre del lugar:</label>
                <input name="nombre_lugar" value={formData.nombre_lugar} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Representante:</label>
                <input name="representante" value={formData.representante} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'input-error' : ''}
                />
                {errors.telefono && <div className="error-text">{errors.telefono}</div>}
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <input name="descripcion" value={formData.descripcion} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Horario de apertura:</label>
                <input type="time" name="horario_apertura" value={formData.horario_apertura} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Horario de cierre:</label>
                <input type="time" name="horario_cierre" value={formData.horario_cierre} onChange={handleChange} />
              </div>
            </>
          )}

          {formData.rol === '2' && (
            <>
              <div className="form-group">
                <label>Nombre del lugar:</label>
                <input name="nombre_lugar" value={formData.nombre_lugar} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Encargado:</label>
                <input name="encargado" value={formData.encargado} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'input-error' : ''}
                />
                {errors.telefono && <div className="error-text">{errors.telefono}</div>}
              </div>
              <div className="form-group">
                <label>Dirección:</label>
                <input name="direccion" value={formData.direccion} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Capacidad:</label>
                <input
                  type="number"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  className={errors.capacidad ? 'input-error' : ''}
                />
                {errors.capacidad && <div className="error-text">{errors.capacidad}</div>}
              </div>
              <div className="form-group">
                <label>Horario de apertura:</label>
                <input type="time" name="horario_apertura" value={formData.horario_apertura} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Horario de cierre:</label>
                <input type="time" name="horario_cierre" value={formData.horario_cierre} onChange={handleChange} />
              </div>
            </>
          )}

          {formData.rol === '3' && (
            <>
              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'input-error' : ''}
                />
                {errors.telefono && <div className="error-text">{errors.telefono}</div>}
              </div>
              <div className="form-group">
                <label>Zona:</label>
                <select name="zona_id" value={formData.zona_id} onChange={handleChange} required>
                  <option value="">Selecciona una zona</option>
                  {zonas.map(zona => (
                    <option key={zona.id} value={zona.id}>
                      {zona.nombre} ({zona.codigo_postal})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {errors.general && <div className="error-text">{errors.general}</div>}

          <button type="submit" className="guardar-btn">
            <i className="fas fa-save" style={{ color: 'white', marginRight: '13px' }}></i>
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;

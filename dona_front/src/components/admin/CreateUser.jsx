import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';
import fondoDecorativo from '../../assets/DonalogoHD.png';

const CreateUser = () => {
  const [zonas, setZonas] = useState([]);
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
        setZonas(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('❌ Las contraseñas no coinciden');
      return;
    }

    if (formData.telefono.length > 20) {
      alert('❌ El teléfono no puede tener más de 20 caracteres');
      return;
    }

    const usuarioBase = {
      nombre: formData.nombre,
      correo: formData.correo,
      contraseña: formData.password,
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
      telefono: formData.telefono,
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
        alert(`❌ Error al crear ${endpoint}:\n${JSON.stringify(data, null, 2)}`);
        return;
      }

      alert(`¡Registro creado con éxito!`);
      window.location.href = '/admin/#/usuarios';
    } catch (err) {
      alert('❌ Error inesperado: ' + err.message);
    }
  };

  return (
    <div className="main-content" style={{ position: 'relative' }}>
      {/* Imagen decorativa de fondo */}
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />

      <h2>➕ Crear nuevo usuario</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>Rol:</label>
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Selecciona un rol</option>
          <option value="1">Donador</option>
          <option value="2">Receptor</option>
          <option value="3">Voluntario</option>
        </select>

        <label>Nombre:</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Correo:</label>
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />

        <label>Contraseña:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Confirmar Contraseña:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        {formData.rol === '1' && (
          <>
            <label>Nombre del lugar:</label>
            <input name="nombre_lugar" value={formData.nombre_lugar} onChange={handleChange} />
            <label>Representante:</label>
            <input name="representante" value={formData.representante} onChange={handleChange} />
            <label>Teléfono:</label>
            <input name="telefono" maxLength="20" value={formData.telefono} onChange={handleChange} />
            <label>Descripción:</label>
            <input name="descripcion" value={formData.descripcion} onChange={handleChange} />
            <label>Horario de apertura:</label>
            <input type="time" name="horario_apertura" value={formData.horario_apertura} onChange={handleChange} />
            <label>Horario de cierre:</label>
            <input type="time" name="horario_cierre" value={formData.horario_cierre} onChange={handleChange} />
          </>
        )}

        {formData.rol === '2' && (
          <>
            <label>Nombre del lugar:</label>
            <input name="nombre_lugar" value={formData.nombre_lugar} onChange={handleChange} />
            <label>Encargado:</label>
            <input name="encargado" value={formData.encargado} onChange={handleChange} />
            <label>Teléfono:</label>
            <input name="telefono" maxLength="20" value={formData.telefono} onChange={handleChange} />
            <label>Dirección:</label>
            <input name="direccion" value={formData.direccion} onChange={handleChange} />
            <label>Capacidad:</label>
            <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} />
            <label>Horario de apertura:</label>
            <input type="time" name="horario_apertura" value={formData.horario_apertura} onChange={handleChange} />
            <label>Horario de cierre:</label>
            <input type="time" name="horario_cierre" value={formData.horario_cierre} onChange={handleChange} />
          </>
        )}

        {formData.rol === '3' && (
          <>
            <label>Teléfono:</label>
            <input name="telefono" maxLength="20" value={formData.telefono} onChange={handleChange} />
            <label>Zona:</label>
            <select name="zona_id" value={formData.zona_id} onChange={handleChange} required>
              <option value="">Selecciona una zona</option>
              {zonas.map(zona => (
                <option key={zona.id} value={zona.id}>
                  {zona.nombre} ({zona.codigo_postal})
                </option>
              ))}
            </select>
          </>
        )}

        <button type="submit" className="submit-btn">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;

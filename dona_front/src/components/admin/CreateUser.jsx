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
        alert(`❌ Error al crear ${endpoint}:
${JSON.stringify(data, null, 2)}`);
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
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />
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

          <div className="form-group">
            <label>Nombre:</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Correo:</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Confirmar Contraseña:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

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
                <input name="telefono" maxLength="20" value={formData.telefono} onChange={handleChange} />
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
                <input name="telefono" maxLength="20" value={formData.telefono} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Dirección:</label>
                <input name="direccion" value={formData.direccion} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Capacidad:</label>
                <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} />
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
                <input name="telefono" maxLength="20" value={formData.telefono} onChange={handleChange} />
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

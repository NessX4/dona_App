import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';

const CreateUser = () => {
  const [zonas, setZonas] = useState([]);
  const [formData, setFormData] = useState({
    rol: '',
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',

    // Donador / Receptor
    nombre_lugar: '',
    representante: '',
    telefono: '',
    descripcion: '',
    horario_apertura: '',
    horario_cierre: '',

    // Receptor específico
    encargado: '',
    direccion: '',
    capacidad: '',

    // Voluntario
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
      alert('Las contraseñas no coinciden');
      return;
    }

    // ✅ CASO ESPECIAL: ADMINISTRADOR
if (formData.rol === '4') {
  try {
    // Paso 1: Crear en usuarios
    const usuarioPayload = {
      nombre: formData.nombre,
      correo: formData.correo,
      contraseña: formData.password,
      rol: formData.rol
    };

    const resUsuario = await fetch('http://127.0.0.1:8000/api/usuarios/usuarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioPayload)
    });

    const dataUsuario = await resUsuario.json();

    if (!resUsuario.ok) {
      console.error('Error creando usuario base:', dataUsuario);
      alert('Error al crear el usuario');
      return;
    }

    // Paso 2: Crear en administradores con el ID del usuario creado
  const adminPayload = {
  usuario: dataUsuario.id,
  nombre: formData.nombre,
  correo: formData.correo,
  contraseña: formData.password
};

  
    const resAdmin = await fetch('http://127.0.0.1:8000/api/usuarios/administradores/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(adminPayload)
});
    const dataAdmin = await resAdmin.json();

   if (!resAdmin.ok) {
  const errorText = await resAdmin.text();  // lee como texto plano
  console.error('Error creando administrador:', errorText);
  alert('Error al crear administrador');
  return;
}


    alert('✅ Administrador creado exitosamente');
    return;

  } catch (err) {
  console.error('Error inesperado al crear administrador:', err);
  alert('Error inesperado: ' + err.message);
}

}









    // 🟢 Para los demás roles
    const usuarioPayload = {
      nombre: formData.nombre,
      correo: formData.correo,
      contraseña: formData.password,
      rol: formData.rol
    };

    try {
      const resUsuario = await fetch('http://127.0.0.1:8000/api/usuarios/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioPayload)
      });

      const dataUsuario = await resUsuario.json();

      if (!resUsuario.ok) {
        console.error('Error creando usuario base:', dataUsuario);
        alert('Error al crear el usuario base');
        return;
      }

      const usuario_id = dataUsuario.id;
      let endpoint = '';
      let payload = { usuario: usuario_id };

      switch (formData.rol) {
        case '1': // Donador
          endpoint = 'donadores';
          payload = {
            usuario: usuario_id,
            nombre_lugar: formData.nombre_lugar,
            representante: formData.representante,
            telefono: formData.telefono,
            descripcion: formData.descripcion,
            horario_apertura: formData.horario_apertura,
            horario_cierre: formData.horario_cierre
          };
          break;

        case '2': // Receptor
          endpoint = 'receptores';
          payload = {
            usuario: usuario_id,
            nombre_lugar: formData.nombre_lugar,
            encargado: formData.encargado,
            telefono: formData.telefono,
            direccion: formData.direccion,
            capacidad: parseInt(formData.capacidad),
            horario_apertura: formData.horario_apertura,
            horario_cierre: formData.horario_cierre
          };
          break;

        case '3': // Voluntario
          endpoint = 'voluntarios';
          payload = {
            usuario: usuario_id,
            telefono: formData.telefono,
            zona: parseInt(formData.zona_id)
          };
          break;

        default:
          alert('Rol inválido');
          return;
      }

      const resRol = await fetch(`http://127.0.0.1:8000/api/usuarios/${endpoint}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const dataRol = await resRol.json();

      if (!resRol.ok) {
        console.error('Error en tabla hija:', dataRol);
        alert('Error al crear información específica del rol.');
        return;
      }

      alert('✅ Usuario creado correctamente');
    } catch (err) {
      console.error('Error inesperado:', err);
      alert('Error inesperado');
    }
  };

  return (
    <div className="main-content">
      <h2>➕ Crear nuevo usuario</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>Rol:</label>
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Selecciona un rol</option>
          <option value="1">Donador</option>
          <option value="2">Receptor</option>
          <option value="3">Voluntario</option>
          <option value="4">Administrador</option>
        </select>

        <label>Nombre:</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Correo:</label>
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />

        <label>Contraseña:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Confirmar Contraseña:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        {/* Campos dinámicos por rol */}
        {formData.rol === '1' && (
          <>
            <label>Nombre del lugar:</label>
            <input name="nombre_lugar" value={formData.nombre_lugar} onChange={handleChange} />
            <label>Representante:</label>
            <input name="representante" value={formData.representante} onChange={handleChange} />
            <label>Teléfono:</label>
            <input name="telefono" value={formData.telefono} onChange={handleChange} />
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
            <input name="telefono" value={formData.telefono} onChange={handleChange} />
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
            <input name="telefono" value={formData.telefono} onChange={handleChange} />
            <label>Zona:</label>
            <select name="zona_id" value={formData.zona_id} onChange={handleChange} required>
              <option value="">Selecciona una zona</option>



              {Array.isArray(zonas) && zonas.length > 0 && zonas.map(zona => (
  <option key={zona.id} value={zona.id}>
    {zona.nombre} ({zona.codigo_postal})
  </option>
))}
console.log('ZONAS EN RENDER:', zonas);




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

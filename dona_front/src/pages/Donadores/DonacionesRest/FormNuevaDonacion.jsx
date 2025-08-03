import React, { useState, useEffect } from "react";
import "./FormNuevaDonacion.css";

const FormNuevaDonacion = () => {
    const hoy = new Date().toISOString().split("T")[0];

    const [sucursales, setSucursales] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [estados, setEstados] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [form, setForm] = useState({
        sucursal: "",
        titulo: "",
        descripcion: "",
        cantidad: "",
        estado: "",
        ubicacion: "",
        zona: "",
        fecha_caducidad: hoy,
        nombre_comida: "",
        cantidad_comida: "",
        ingredientes: "",
        categoria_comida: "",
        url_imagen: "",
    });

    const [mensaje, setMensaje] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/")
            .then((res) => res.json())
            .then((data) => setSucursales(data.results || data));

        fetch("http://127.0.0.1:8000/api/zonas/zonas/")
            .then((res) => res.json())
            .then((data) => setZonas(data.results || data));

        fetch("http://127.0.0.1:8000/api/donaciones/estados/")
            .then((res) => res.json())
            .then((data) => setEstados(data.results || data));

        fetch("http://127.0.0.1:8000/api/zonas/ubicaciones/")
            .then((res) => res.json())
            .then((data) => setUbicaciones(data.results || data));

        fetch("http://127.0.0.1:8000/api/donaciones/categorias/")
            .then((res) => res.json())
            .then((data) => setCategorias(data.results || data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaPublicacion = {
            titulo: form.titulo,
            descripcion: form.descripcion,
            cantidad: parseInt(form.cantidad),
            fecha_caducidad: form.fecha_caducidad,
            estado: parseInt(form.estado),
            ubicacion: parseInt(form.ubicacion),
            zona: parseInt(form.zona),
            sucursal: parseInt(form.sucursal),
        };

        try {
            const resPub = await fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaPublicacion),
            });

            if (!resPub.ok) {
                const errData = await resPub.json();
                setMensaje("Error al crear publicación: " + JSON.stringify(errData));
                return;
            }

            const pubCreada = await resPub.json();

            await fetch("http://127.0.0.1:8000/api/donaciones/comidas/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: form.nombre_comida,
                    cantidad: parseInt(form.cantidad_comida),
                    ingredientes: form.ingredientes,
                    categoria: parseInt(form.categoria_comida),
                    publicacion: pubCreada.id,
                }),
            });

            if (form.url_imagen.trim() !== "") {
                await fetch("http://127.0.0.1:8000/api/donaciones/archivos/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: form.url_imagen,
                        tipo: "imagen",
                        publicacion: pubCreada.id,
                    }),
                });
            }

            setMensaje("¡Publicación registrada exitosamente!");
            setMostrarModal(true);

            setForm({
                sucursal: "",
                titulo: "",
                descripcion: "",
                cantidad: "",
                estado: "",
                ubicacion: "",
                zona: "",
                fecha_caducidad: hoy,
                nombre_comida: "",
                cantidad_comida: "",
                ingredientes: "",
                categoria_comida: "",
                url_imagen: "",
            });
        } catch (err) {
            console.error("Error en registro:", err);
            setMensaje("Error al registrar publicación.");
        }
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    return (
        <div className="form-container">
            <h2 className="titulo-rojo">Agregar Publicación</h2>
            <form onSubmit={handleSubmit} className="form-nueva-donacion">
                <label>Sucursal:</label>
                <select name="sucursal" value={form.sucursal} onChange={handleChange} required>
                    <option value="">Seleccione una sucursal</option>
                    {sucursales.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.nombre}
                        </option>
                    ))}
                </select>

                <label>Título:</label>
                <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required />

                <label>Descripción:</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />

                <label>Cantidad:</label>
                <input
                    type="number"
                    name="cantidad"
                    value={form.cantidad}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <label>Estado:</label>
                <select name="estado" value={form.estado} onChange={handleChange} required>
                    <option value="">Seleccione estado</option>
                    {estados.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.nombre}
                        </option>
                    ))}
                </select>

                <label>Ubicación:</label>
                <select name="ubicacion" value={form.ubicacion} onChange={handleChange} required>
                    <option value="">Seleccione ubicación</option>
                    {ubicaciones.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.direccion}
                        </option>
                    ))}
                </select>

                <label>Zona:</label>
                <select name="zona" value={form.zona} onChange={handleChange} required>
                    <option value="">Seleccione zona</option>
                    {zonas.map((z) => (
                        <option key={z.id} value={z.id}>
                            {z.nombre}
                        </option>
                    ))}
                </select>

                <label>Fecha de caducidad:</label>
                <input
                    type="date"
                    name="fecha_caducidad"
                    value={form.fecha_caducidad}
                    onChange={handleChange}
                    required
                />

                <h3>Información de la Comida</h3>

                <label>Nombre de la comida:</label>
                <input
                    type="text"
                    name="nombre_comida"
                    value={form.nombre_comida}
                    onChange={handleChange}
                    required
                />

                <label>Cantidad de comida:</label>
                <input
                    type="number"
                    name="cantidad_comida"
                    value={form.cantidad_comida}
                    onChange={handleChange}
                    required
                />

                <label>Ingredientes:</label>
                <textarea
                    name="ingredientes"
                    value={form.ingredientes}
                    onChange={handleChange}
                    required
                />

                <label>Categoría de comida:</label>
                <select
                    name="categoria_comida"
                    value={form.categoria_comida}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.nombre}
                        </option>
                    ))}
                </select>

                <label>URL de la imagen (opcional):</label>
                <input
                    type="text"
                    name="url_imagen"
                    value={form.url_imagen}
                    onChange={handleChange}
                    placeholder="Pega aquí la URL de la imagen"
                />

                <button type="submit" className="btn-submit-publicacion">
                    Agregar Publicación
                </button>
            </form>

            {mostrarModal && (
                <div className="modal-backdrop" onClick={cerrarModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <p className="mensaje">{mensaje}</p>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormNuevaDonacion;
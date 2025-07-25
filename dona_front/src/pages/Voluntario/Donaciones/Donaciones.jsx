import React, { useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";

const Donaciones = () => {
  // Datos locales simulando la API
  const [donaciones] = useState([
    {
      id: 1,
      sucursal: "Sucursal Centro",
      estado: "En proceso",
      publicacion: "Comida para familias",
      categoria: "Alimentos secos",
      comida: "Arroz",
    },
    {
      id: 2,
      sucursal: "Sucursal Norte",
      estado: "Completada",
      publicacion: "Donación de frutas",
      categoria: "Frutas",
      comida: "Manzanas",
    },
    {
      id: 3,
      sucursal: "Sucursal Sur",
      estado: "Pendiente",
      publicacion: "Comida enlatada",
      categoria: "Enlatados",
      comida: "Atún",
    },
  ]);

  return (
    <>
      <VoluntarioHeader />
      <main className="container">
        <h1>Publicaciones de Donaciones</h1>

        <table>
          <thead>
            <tr>
              <th>Sucursal</th>
              <th>Estado Donación</th>
              <th>Publicación</th>
              <th>Categoría Comida</th>
              <th>Comida</th>
            </tr>
          </thead>
          <tbody>
            {donaciones.map((item) => (
              <tr key={item.id}>
                <td data-label="Sucursal">{item.sucursal}</td>
                <td data-label="Estado Donación">{item.estado}</td>
                <td data-label="Publicación">{item.publicacion}</td>
                <td data-label="Categoría Comida">{item.categoria}</td>
                <td data-label="Comida">{item.comida}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Donaciones;

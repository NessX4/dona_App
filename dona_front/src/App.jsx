// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* otras rutas */}
    </Routes>
  );
}

export default App;

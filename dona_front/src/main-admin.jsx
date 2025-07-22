// src/main-admin.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminPanel from './components/admin/AdminPanel';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
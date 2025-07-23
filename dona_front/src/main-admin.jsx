// src/main-admin.jsx
// src/main-admin.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/admin/AdminPanel';

import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/*" element={<AdminPanel />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

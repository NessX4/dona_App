import React from "react";
import { Outlet } from "react-router-dom";
import "./LayoutPrincipal.css";

const LayoutPrincipal = () => {
  return (
    <div className="layout-container">
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPrincipal;

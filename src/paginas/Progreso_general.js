import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgresoGlobal from "../components/ProgresoGlobal";
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import BarraProgreso from '../components/BarraProgreso'; // 1. Importa la barra
import { supabase } from "../Supabase/Cliente"; // Asegúrate de tener esta línea al inicio


function Progreso_general() {
  return (
    <div>
      <NavBar />
    <div className="container mt-4">
      {/*Mostrar analisis de progreso*/}
      <h1 style={{ textAlign: "center", color: "#ff6f61" }}>Análisis de Progreso</h1>
      <ProgresoGlobal />
    </div>
    </div>
  );
}

export default Progreso_general;

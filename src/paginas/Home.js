import React from "react";
import { useNavigate } from "react-router-dom";
import "../Bienvenida.css"; // Opcional: para estilos personalizados
import logo from "../IMG/logo.png"; // Cambia por tu logo si tienes uno
import { NavBar } from '../components/NavBar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div >
      <NavBar />
      <div className="bienvenida-container">
        <img src={logo} alt="Logo" className="bienvenida-logo" />
        <h1>¡Bienvenido/a a la Plataforma de Aprendizaje!</h1>
        <p className="bienvenida-desc">
          Aquí podrás aprender sobre <b>hardware</b> y <b>software</b> de manera interactiva y divertida.<br />
          Explora los ejercicios, pon a prueba tus conocimientos y sigue tu progreso.<br />
          <br />
          <b>¿Listo para comenzar?</b>
        </p>
        <div className="bienvenida-btns">
          <button className="bienvenida-btn" onClick={() => navigate("/register")}>
            Registrarme
          </button>
          <button className="bienvenida-btn secundaria" onClick={() => navigate("/login")}>
            Ya tengo cuenta
          </button>
          <button className="bienvenida-btn secundaria" onClick={() => navigate("/home")}>
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
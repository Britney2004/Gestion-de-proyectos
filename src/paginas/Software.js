import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hardwareData from '../components/Software';
import hardwareImg from '../IMG/software.jpg';
import { NavBar } from '../components/NavBar';
import '../Hardware.css';

export default function HardwareInfo({ onBack }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const selectedData = hardwareData.find(c => c.key === selected);

  return (
    <div className="hardwareinfo-root">
      <NavBar />

      {/* Contenido principal */}
      <div className="hardwareinfo-main">
        {/* Imagen */}
        <div className="hardwareinfo-imgbox">
          <img
            src={selectedData ? selectedData.image : hardwareImg}
            alt={selectedData ? selectedData.label : "Hardware"}
            className="hardwareinfo-img"
          />
        </div>

        {/* Texto */}
        <div className="hardwareinfo-textbox">
          <h1 className="hardwareinfo-title">
            {selectedData ? selectedData.label : "Hardware"}
          </h1>
          <div className="hardwareinfo-description">
            {selectedData
              ? selectedData.description
              : <>
                  Hardware se refiere a todas las partes físicas de una computadora o dispositivo electrónico, como la CPU, memoria RAM, discos duros y periféricos. Se clasifica en hardware de procesamiento (ej. CPU y GPU), almacenamiento (ej. discos duros y SSD), entrada y salida (ej. teclado, mouse, pantalla) y comunicación (ej. tarjetas de red).
                  <br /><br />
                  Su importancia radica en que permite la ejecución de instrucciones y la interacción con el software, formando juntos el sistema completo que hace posible cualquier operación o tarea computacional. Sin hardware, el software no podría funcionar.
                </>
            }
          </div>
        </div>
      </div>

      {/*  Menú de componentes fijo */}
      <div className="hardwareinfo-menu">
        {hardwareData.map(c => (
          <button
            key={c.key}
            onClick={() => setSelected(c.key)}
            className={`hardwareinfo-menu-btn${selected === c.key ? ' selected' : ''}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Botones fijos */}
      <div className="hardwareinfo-footer">
        <button
          onClick={() => {
            if (selected) setSelected(null);
            else onBack && onBack();
          }}
          className="hardwareinfo-backbtn"
        >
          &#8592; {selected ? "Volver a Software" : "Volver"}
        </button>
        <button
          onClick={() => navigate('/hardware/test')}
          className="hardwareinfo-testbtn"
        >
          Ir al Test &rarr;
        </button>
      </div>
    </div>
  );
}
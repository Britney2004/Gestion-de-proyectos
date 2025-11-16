import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";

import conocimientoImg from "../IMG/hardware.jpeg";
import ejercicioImg from "../IMG/conocimiento.png";
import analisisImg from "../IMG/progre.jpeg";
import softwareImg from "../IMG/software.jpeg";




const sections = [
  {
    name: "Hardware",
    path: "/hardware",
    background: conocimientoImg,
  },
  {
    name: "Ejercicios",
    path: "/ejercicios",
    background: ejercicioImg,
    href: "/ejercicios"
  },
  {
    name: "Analisis de progreso",
    path: "/analisis",
    background: analisisImg

  },
  {
    name: "Software",
    path: "/software",
    background: softwareImg
  }
];

function Secciones() {
  return (
    <div>
      <NavBar />
      <div className="container text-center mt-5">
        <h2 className="mb-4" style={{ height: "80%", width: "100%", marginTop: "20%" }}>
          Selecciona una sección
        </h2>
        <div className="row w-100 justify-content-center">
          {sections.map((section) => (
            <div key={section.name} className="col-12 col-md-6 col-lg-4 mb-3">
              <a
                href={section.path}
                className="btn btn-outline-primary w-100 py-5 d-flex flex-column align-items-center justify-content-center"
                style={{
                  backgroundImage: `url(${section.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#fff", // texto blanco para contraste
                  border: "none", // opcional para no mostrar borde
                  height: "150px", // altura para que se note bien el fondo
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)" // para que texto se lea bien
                }}
              >
                {section.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Secciones;

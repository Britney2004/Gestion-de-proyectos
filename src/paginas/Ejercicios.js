import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";

import sopaImg from "../IMG/sopa_letras.jpeg";
import analisisImg from "../IMG/trivia.jpg";
import softwareImg from "../IMG/test.jpg";
import ahorcadoImg from "../IMG/ahorcado.jpg";


const sections = [
  {
    name: "Sopa de letras",
    path: "/sopa-de-letras",
    background: sopaImg,
  },
  {
    name: "Ahorcado",
    path: "/ahorcado",
    background: ahorcadoImg,
  },
  {
    name: "Trivia",
    path: "/trivia",
    background: analisisImg,
  },
  {
    name: "Test de conocimiento",
    path: "/hardware-test",
    background: softwareImg,
  }
];

function Ejercicios() {
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

export default Ejercicios;

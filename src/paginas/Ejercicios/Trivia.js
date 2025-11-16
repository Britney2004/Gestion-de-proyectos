import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../../components/NavBar";
import BarraProgreso from "../../components/BarraProgreso";
import { supabase } from "../../Supabase/Cliente";

const preguntas = [
  {
    pregunta: "¿Qué componente es considerado el 'cerebro' de la computadora?",
    opciones: ["Disco duro", "CPU", "RAM", "Tarjeta gráfica"],
    correcta: 1,
    explicacion: "La CPU ejecuta las instrucciones y controla la mayoría de las operaciones del computador."
  },
  {
    pregunta: "¿Qué diferencia hay entre hardware y software?",
    opciones: [
      "El hardware son componentes físicos y el software son programas",
      "El software son cables y el hardware son pantallas",
      "No hay diferencia",
      "El software se instala en los cables"
    ],
    correcta: 0,
    explicacion: "El hardware es lo tangible (componentes), mientras que el software son programas y datos."
  },
  {
    pregunta: "¿Qué hace un sistema operativo?",
    opciones: [
      "Controla los recursos y permite que los programas funcionen",
      "Alimenta la fuente de poder",
      "Conecta los cables de red",
      "Solo ejecuta videojuegos"
    ],
    correcta: 0,
    explicacion: "El sistema operativo gestiona los recursos del hardware y ejecuta aplicaciones."
  },
  {
    pregunta: "¿Qué es la memoria RAM?",
    opciones: [
      "Memoria temporal que almacena datos mientras el equipo está encendido",
      "Memoria que guarda datos permanentemente",
      "Un tipo de procesador",
      "Un tipo de programa"
    ],
    correcta: 0,
    explicacion: "La RAM almacena temporalmente los datos que usa la CPU mientras el equipo está encendido."
  },
  {
    pregunta: "¿Qué es un 'driver' o controlador?",
    opciones: [
      "Un programa que permite al sistema operativo comunicarse con el hardware",
      "Un componente del CPU",
      "Un cable de conexión",
      "Un tipo de antivirus"
    ],
    correcta: 0,
    explicacion: "Los controladores permiten que el sistema reconozca y use correctamente los dispositivos."
  }
];

function Trivia() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  // Declaramos progreso
  const [progreso, setProgreso] = useState(0);

  const pregunta = preguntas[preguntaActual];

  const handleSeleccion = (indice) => {
    setSeleccion(indice);
    setMostrarExplicacion(true);
    if (indice === pregunta.correcta) {
      setPuntaje(puntaje + 10);

      setProgreso((prev) => prev +(100/ preguntas.length));
    }
  };

  const siguiente = () => {
    setSeleccion(null);
    setMostrarExplicacion(false);
    setPreguntaActual(preguntaActual + 1);

  };

  const reiniciar = () => {
    setPreguntaActual(0);
    setSeleccion(null);
    setPuntaje(0);
    setMostrarExplicacion(false);
    setProgreso(0);
  };

useEffect(() => {
  if (progreso <= 0) return;

  async function guardarProgreso() {
    // 1. Obtener la primera fila
    const { data, error } = await supabase
      .from("Progreso")
      .select("id")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error || !data) return;

    // 2. Actualizar el progreso en la primera fila
    await supabase
      .from("Progreso")
      .update({ trivia: progreso })
      .eq("id", data.id);
  }

  guardarProgreso();
}, [progreso]);

  if (preguntaActual >= preguntas.length) {
    return (
      <div className="container p-4 shadow rounded bg-light mt-5" style={{ maxWidth: "60%" }}>
        <h1 className="text-center mb-4">Trivia: Hardware y Software</h1>
        <h3 className="text-center">Juego terminado 🎉</h3>
        <p className="text-center">Obtuviste {puntaje} puntos de {preguntas.length * 10}.</p>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={reiniciar}>Reiniciar</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
    <div className="container p-4 shadow rounded bg-light mt-5" style={{ maxWidth: "60%", opacity: 0.90 }}>
      <h1 className="text-center mb-4">Trivia: Hardware y Software</h1>
      <div className="fs-5 mb-3">{pregunta.pregunta}</div>
      <div className="mb-2">
        {pregunta.opciones.map((opcion, idx) => (
          <button
            key={idx}
            className={`btn w-100 mb-2 text-start ${
              seleccion === null
                ? "btn-outline-primary"
                : idx === pregunta.correcta
                ? "btn-success"
                : idx === seleccion
                ? "btn-danger"
                : "btn-outline-primary"
            }`}
            disabled={seleccion !== null}
            onClick={() => handleSeleccion(idx)}
          >
            {opcion}
          </button>
        ))}
      </div>
      {mostrarExplicacion && (
        <div className="mt-2 text-secondary">
          💡 {pregunta.explicacion}
        </div>
      )}
      <div className="controls mt-3 text-center">
        <button
          className="btn btn-primary me-2"
          onClick={siguiente}
          disabled={seleccion === null}
        >
          Siguiente
        </button>
        <button className="btn btn-secondary" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>
      <p className="mt-3 fw-bold">Puntuación: {puntaje}</p>
      {/*Barra de Progreso*/}
      <div style={{ marginTop: "20px" }}>
        <BarraProgreso value={progreso} />
      </div>
    </div>
    </div>
  );
}

export default Trivia;
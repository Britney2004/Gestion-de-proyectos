import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../../components/NavBar";
import DibujoAhorcado from "../../components/DibujoAhoracado";
import BarraProgreso from "../../components/BarraProgreso";
import { supabase } from "../../Supabase/Cliente";

const preguntas = [
    {
        pregunta: "Dispositivo que procesa datos y ejecuta programas.",
        respuesta: "procesador"
    },
     {
         pregunta: "Programa que permite interactuar con el hardware.",
         respuesta: "sistema operativo"
     },
     {
         pregunta: "Memoria volátil utilizada por el procesador.",
         respuesta: "ram"
     },
     {
         pregunta: "Dispositivo de almacenamiento permanente.",
         respuesta: "disco"
     },
     {
         pregunta: "Software para navegar por internet.",
         respuesta: "navegador"
     }
];

function Ahoracado() {
    const [indice, setIndice] = useState(0);
    const [letras, setLetras] = useState([]);
    const [fallos, setFallos] = useState(0);
    const [input, setInput] = useState("");
    const [ganaste, setGanaste] = useState(false);
    const [perdiste, setPerdiste] = useState(false);
    // Barra de progreso
    const [progreso, setProgreso] = useState(0);
    const preguntaActual = preguntas[indice];
    const palabra = preguntaActual.respuesta.toLowerCase();
    const mostrarPalabra = palabra
        .split("")
        .map((letra) => (letras.includes(letra) ? letra : "_"))
        .join(" ");
    const handleInput = (e) => {
        setInput(e.target.value);
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
                .update({ ahorcado: progreso })
                .eq("id", data.id);
        }

        guardarProgreso();
    }, [progreso]);


    const handleAdivinar = (e) => {
        e.preventDefault();
        const intento = input.toLowerCase().trim();
        setInput("");
        if (!intento) return;

        // Si el usuario adivina la palabra completa
        if (intento === palabra) {
            setGanaste(true);
            setLetras([...new Set([...letras, ...palabra.split("")])]);
            setProgreso(((indice + 1) / preguntas.length) * 100);
            return;
        }

        // Si el usuario ingresa una sola letra
        if (intento.length === 1) {
            if (letras.includes(intento)) return;

            if (palabra.includes(intento)) {
                const nuevasLetras = [...letras, intento];
                setLetras(nuevasLetras);

                // Verificar si ganó
                if (palabra.split("").every((l) => nuevasLetras.includes(l))) {
                    setGanaste(true);
                    setProgreso(((indice + 1) / preguntas.length) * 100);
                }
            } else {
                setFallos(fallos + 1);
                if (fallos + 1 >= 6) {
                    setPerdiste(true);
                }
            }
        }
        // Si el usuario ingresa más de una letra pero no es la palabra correcta, cuenta como fallo
        else {
            setFallos(fallos + 1);
            if (fallos + 1 >= 6) {
                setPerdiste(true);
            }
        }
    };

    const siguientePregunta = () => {
        setIndice(indice + 1);
        setLetras([]);
        setFallos(0);
        setGanaste(false);
        setPerdiste(false);
        // Cargar progreso
        setProgreso(((indice + 1) / preguntas.length) * 100)
    };

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <h2>Juego de Ahorcado</h2>
                <p><strong>Pregunta:</strong> {preguntaActual.pregunta}</p>
                <h3 className="mb-3">{mostrarPalabra}</h3>
                <p>Fallos: {fallos} / 6</p>
                <DibujoAhorcado fallos={fallos} />
                {!ganaste && !perdiste && (
                    <form onSubmit={handleAdivinar} className="mb-3">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInput}
                            className="form-control w-25 d-inline"
                            style={{ textTransform: "lowercase" }}
                            disabled={ganaste || perdiste}
                        />
                        <button type="submit" className="btn btn-primary ms-2">
                            Adivinar letra
                        </button>
                    </form>
                )}
                {ganaste && (
                    <div className="alert alert-success">
                        ¡Correcto! La palabra era <strong>{palabra}</strong>.
                        {indice < preguntas.length - 1 && (
                            <button className="btn btn-success ms-3" onClick={siguientePregunta}>
                                Siguiente pregunta
                            </button>
                        )}
                    </div>
                )}
                {perdiste && (
                    <div className="alert alert-danger">
                        ¡Has perdido! La palabra era <strong>{palabra}</strong>.
                        {indice < preguntas.length - 1 && (
                            <button className="btn btn-warning ms-3" onClick={siguientePregunta}>
                                Siguiente pregunta
                            </button>
                        )}
                    </div>
                )}
                {indice >= preguntas.length - 1 && (ganaste || perdiste) && (
                    <div className="mt-3">
                        <span>¡Fin del juego!</span>
                    </div>
                )}

                {/* Barra de progreso */}
                <div style={{ marginTop: "20px" }}>
                    <BarraProgreso value={progreso} />
                </div>
            </div>
        </div>
    );
}

export default Ahoracado;

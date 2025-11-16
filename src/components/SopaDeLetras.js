import React, { useState, useEffect } from "react";
import "./SopaDeLetras.css";
import BarraProgreso from "./BarraProgreso";
import { supabase } from "../Supabase/Cliente";

const SopaDeLetras = ({ tablero, palabras, reiniciar }) => {
  const [seleccionActual, setSeleccionActual] = useState([]);
  const [selecciones, setSelecciones] = useState([]);
  const [mousePresionado, setMousePresionado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [terminado, setTerminado] = useState(false);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    setSeleccionActual([]);
    setSelecciones([]);
    setMensaje("");
    setMousePresionado(false);
    setTerminado(false);
    setProgreso(0);
  }, [reiniciar]);

  const coordsToString = (coords) => coords.map(([f, c]) => `${f},${c}`).join(";");
  const canonicalKey = (coords) => {
    const fwd = coordsToString(coords);
    const rev = coordsToString([...coords].reverse());
    return fwd < rev ? fwd : rev;
  };
  const obtenerPalabraDesdeCoords = (coords) =>
    coords.map(([f, c]) => tablero[f][c]).join("");

  const indexSeleccionPorClave = (clave) =>
    selecciones.findIndex((s) => s.clave === clave);

  const manejarInicio = (fila, col) => {
    if (terminado) return;
    setSeleccionActual([[fila, col]]);
    setMousePresionado(true);
  };

  const manejarArrastre = (fila, col) => {
    if (!mousePresionado || terminado) return;
    setSeleccionActual((prev) => {
      if (!prev.some(([f, c]) => f === fila && c === col)) {
        return [...prev, [fila, col]];
      }
      return prev;
    });
  };

  const manejarFin = () => {
    if (terminado) {
      setSeleccionActual([]);
      setMousePresionado(false);
      return;
    }

    if (seleccionActual.length === 0) {
      setMousePresionado(false);
      return;
    }

    const clave = canonicalKey(seleccionActual);
    const idx = indexSeleccionPorClave(clave);

    if (idx !== -1) {
      setSelecciones((prev) => prev.filter((_, i) => i !== idx));
    } else {
      const palabraDetectada = obtenerPalabraDesdeCoords(seleccionActual).toUpperCase();
      const palabraReversa = palabraDetectada.split("").reverse().join("");
      const listaValidas = palabras.map((p) => p.toUpperCase());

      if (listaValidas.includes(palabraDetectada) || listaValidas.includes(palabraReversa)) {
        setSelecciones((prev) => [
          ...prev,
          { coords: seleccionActual, clave, palabraDetectada, correcto: false },
        ]);
      }
    }

    setSeleccionActual([]);
    setMousePresionado(false);
  };

  const estaSeleccionada = (fila, col) =>
    seleccionActual.some(([f, c]) => f === fila && c === col) ||
    selecciones.some((sel) => sel.coords.some(([f, c]) => f === fila && c === col));

  const comprobarPalabras = () => {
    if (terminado) return;
    setMensaje("");

    const buscadas = palabras.map((p) => p.toUpperCase().trim());
    const nuevasSelecciones = selecciones.map((sel) => {
      const palabra = sel.palabraDetectada.toUpperCase();
      const palabraRev = palabra.split("").reverse().join("");
      const correcto = buscadas.includes(palabra) || buscadas.includes(palabraRev);
      return { ...sel, correcto };
    });

    setSelecciones(nuevasSelecciones);

    const encontradas = new Set();
    nuevasSelecciones.forEach((sel) => {
      if (sel.correcto) {
        const palabra = sel.palabraDetectada.toUpperCase();
        const canon = buscadas.includes(palabra)
          ? palabra
          : palabra.split("").reverse().join("");
        encontradas.add(canon);
      }
    });

    // Calcular porcentaje
    const progresoActual = Math.round((encontradas.size / buscadas.length) * 100);
    setProgreso(progresoActual);

    if (progresoActual === 100) {
      setMensaje("¡Encontraste todas las palabras!");
      setTerminado(true);
    } else {
      setMensaje("Aún no has encontrado todas las palabras...");
    }
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


  return (
    <div className="sopa-area">
      <div
        className="sopa-contenedor"
        onMouseUp={manejarFin}
        onMouseLeave={manejarFin}
      >
        {tablero.map((filaArr, iFila) => (
          <div key={iFila} className="sopa-fila">
            {filaArr.map((letra, iCol) => {
              const esSel = estaSeleccionada(iFila, iCol);
              const perteneceCorrecta = selecciones.some(
                (s) => s.correcto && s.coords.some(([f, c]) => f === iFila && c === iCol)
              );
              return (
                <div
                  key={iCol}
                  className={`sopa-celda ${esSel ? "seleccionada" : ""} ${perteneceCorrecta ? "correcta" : ""
                    } ${terminado ? "bloqueada" : ""}`}
                  onMouseDown={() => manejarInicio(iFila, iCol)}
                  onMouseEnter={() => manejarArrastre(iFila, iCol)}
                >
                  {letra}
                </div>
              );
            })}
          </div>
        ))}
        {/*Boton de comprobar*/}
        <div className="boton-area">
          <button
            onClick={comprobarPalabras}
            className="boton-comprobar"
            disabled={terminado}
          >
            Comprobar
          </button>
        </div>

        {/* Barra de progreso */}
        <div style={{ marginTop: "20px" }}>
          <BarraProgreso value={progreso} />
        </div>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default SopaDeLetras;

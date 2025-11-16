import React, { useState } from "react";
import SopaDeLetras from "../../components/SopaDeLetras";
import SopaDeLetrasJuego from "../../components/SopaDeLetrasJuego";
import { supabase } from "../../Supabase/Cliente";
import { NavBar } from "../../components/NavBar";


function Sopa_de_Letras() {
  // Valores para crear la sopa de letras
  const [filas, setFilas] = useState(10); //Filas por defecto
  const [columnas, setColumnas] = useState(10); // Columnas por defecto
  const [letras, setLetras] = useState("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"); //Valores permitidos para rellenar la sopa de letras
  const [textoPalabras, setTextoPalabras] = useState("GPU\nCPU\nRAM"); //Palabras que seran colocadas en el tablero
  const [juego, setJuego] = useState(null);
  const [listaPalabras, setListaPalabras] = useState([]);
  const [reiniciar, setReiniciar] = useState(0); //reinicia la sopa
  const [error, setError] = useState(""); // comprobar errores

  const generarSopa = () => {
    setError("");
    const palabras = textoPalabras
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p !== "");

    if (palabras.length === 0) {
      setError("Debes agregar al menos una palabra.");
      return;
    }

    // Solo se crea el tablero si las palabras a buscar caben dentro de la cuadricula generada
    const palabraLarga = palabras.find(
      (p) => p.length > filas && p.length > columnas
    );

    if (palabraLarga) {
      setError(
        `La palabra "${palabraLarga}" no cabe: mide ${palabraLarga.length} letras, pero la sopa es de ${filas}x${columnas}.`
      );
      return;
    }

    const nuevoJuego = new SopaDeLetrasJuego(filas, columnas, letras, palabras);
    setJuego(nuevoJuego);
    setListaPalabras(palabras);
    setReiniciar((prev) => prev + 1);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4"><h1 className="titulo">Sopa de Letras</h1>

        <div className="panel-configuracion">
          <label>Filas: </label>
          <input
            type="number"
            min="3"
            value={filas}
            onChange={(e) => setFilas(Number(e.target.value))}
          />

          <label> Columnas: </label>
          <input
            type="number"
            min="3"
            value={columnas}
            onChange={(e) => setColumnas(Number(e.target.value))}
          />
          <br />

          <label>Letras permitidas:</label>
          <input
            type="text"
            value={letras}
            onChange={(e) => setLetras(e.target.value.toUpperCase())}
          />
          <br />

          <label>Palabras a buscar (una por línea):</label>
          <br />
          <textarea
            rows="4"
            cols="25"
            value={textoPalabras}
            onChange={(e) => setTextoPalabras(e.target.value)}
          ></textarea>
          <br />

          <button onClick={generarSopa} className="boton-generar">
            Generar Sopa
          </button>

          {error && <p className="mensaje-error">{error}</p>}
        </div>

        {juego && (
          <>
            <SopaDeLetras
              tablero={juego.obtenerTablero()}
              palabras={listaPalabras}
              reiniciar={reiniciar}
            />
            <div className="card mt-4">
              <h3>Palabras a buscar:</h3>
              <ul>
                {listaPalabras.map((p, i) => (
                  <li key={i}>{p.toUpperCase()}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      </div>
      );
}

      export default Sopa_de_Letras;
//Creacion del tablero dirigida a docentes
export default class SopaDeLetrasJuego {
  constructor(filas, columnas, letrasPermitidas, palabras) {
    this.filas = filas;
    this.columnas = columnas;
    this.letrasPermitidas = letrasPermitidas;
    this.palabras = palabras.map((p) => p.toUpperCase());
    this.tablero = Array.from({ length: filas }, () =>
      Array(columnas).fill("")
    );
    this.generarTablero();
  }

  generarTablero() {
    this.palabras.forEach((palabra) => {
      this.colocarPalabra(palabra);
    });

    // Rellenar los espacios vacíos
    const letras = this.letrasPermitidas.split("");
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        if (this.tablero[i][j] === "") {
          this.tablero[i][j] =
            letras[Math.floor(Math.random() * letras.length)];
        }
      }
    }
  }

  colocarPalabra(palabra) {
    const direcciones = [
      [0, 1], // Horizontal derecha
      [1, 0], // Vertical abajo
      [1, 1], // Diagonal abajo derecha
      [0, -1], // Horizontal izquierda
      [-1, 0], // Vertical arriba
      [-1, -1], // Diagonal arriba izquierda
      [-1, 1], // Diagonal arriba derecha
      [1, -1], // Diagonal abajo izquierda
    ];
    let colocada = false;
    let intentos = 0;

    while (!colocada && intentos < 200) {
      const fila = Math.floor(Math.random() * this.filas);
      const col = Math.floor(Math.random() * this.columnas);
      const [df, dc] =
        direcciones[Math.floor(Math.random() * direcciones.length)];

      if (this.puedeColocarse(palabra, fila, col, df, dc)) {
        for (let i = 0; i < palabra.length; i++) {
          const f = fila + i * df;
          const c = col + i * dc;
          this.tablero[f][c] = palabra[i];
        }
        colocada = true;
      }

      intentos++;
    }
  }
  //Comprobar si la palabra se puede colocar
  puedeColocarse(palabra, fila, col, df, dc) {
    for (let i = 0; i < palabra.length; i++) {
      const f = fila + i * df;
      const c = col + i * dc;
      if (f < 0 || f >= this.filas || c < 0 || c >= this.columnas) return false;

      const celda = this.tablero[f][c];
      if (celda !== "" && celda !== palabra[i]) {
        return false;
      }
    }
    return true;
  }
  //Crear tablero
  obtenerTablero() {
    return this.tablero;
  }
}
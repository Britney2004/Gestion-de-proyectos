import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const BarraProgreso = ({ value }) => {
  const progresoRef = useRef(null);
  const percentajeRef = useRef(null);
  const valorPrevio = useRef(0);

  useEffect(() => {
    if (value === 100 && valorPrevio.current < 100) {
      const handleTransitionEnd = () => {
        // Coordenadas de la barra de porcentaje para el confetti
        const rect = progresoRef.current.getBoundingClientRect(); // posición de la barra
        const percentRect = percentajeRef.current.getBoundingClientRect(); // posición del número
        // El confetti sale desde la propia barra: const x = (rect.left + rect.width / 2) / window.innerWidth;
        // const y = (rect.top + rect.height / 2) / window.innerHeight; o desde el porcentaje:
        const x = (percentRect.left + percentRect.width / 2) / window.innerWidth;
        const y = (percentRect.top + percentRect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 120,
          spread: 70,
          origin: { x, y },
        });
        progresoRef.current.removeEventListener("transitionend", handleTransitionEnd);
      };
      progresoRef.current.addEventListener("transitionend", handleTransitionEnd);
    }

    valorPrevio.current = value;
  }, [value]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: "100%",
          background: "#e9ecef",
          borderRadius: "10px",
          overflow: "hidden",
          height: "25px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <div
          ref={progresoRef}
          style={{
            width: `${value}%`,
            background: "linear-gradient(to right, red, orange)", //colores de la barra
            height: "100%",
            transition: "width 0.4s ease",
          }}
        ></div>
      </div>
      <span ref={percentajeRef} style={{ fontWeight: "bold" }}>
        {value}%
      </span>
    </div>
  );
};

export default BarraProgreso;

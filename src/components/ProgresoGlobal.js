import React, { useEffect, useState } from "react";
import { supabase } from "../Supabase/Cliente";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import BarraProgreso from "./BarraProgreso";

const ProgresoGlobal = () => {
  const [ejercicios, setEjercicios] = useState([
    { nombre: "Sopa de Letras", progreso: 0 },
    { nombre: "Ahorcado", progreso: 0 },
    { nombre: "Trivia", progreso: 0 },
  ]);

  // ✅ Cargar progreso desde Supabase
  useEffect(() => {
    async function cargarProgreso() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("Progreso")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setEjercicios([
          { nombre: "Sopa de Letras", progreso: data.sopa || 0 },
          { nombre: "Ahorcado", progreso: data.ahorcado || 0 },
          { nombre: "Trivia", progreso: data.trivia || 0 },
          { nombre: "Hardware", progreso: data.hardware || 0 },
        ]);
      }
    }

    cargarProgreso();
  }, []);

  // ✅ Calcular promedio real
  const promedio =
    ejercicios.reduce((acc, e) => acc + e.progreso, 0) / ejercicios.length;

  // ✅ Datos para gráfico circular
  const dataPie = [
    { name: "Completado", value: promedio },
    { name: "Faltante", value: 100 - promedio },
  ];

  const COLORS = ["#ffb347", "#ffe3b3"];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "20px",
        borderRadius: "25px",
        background: "linear-gradient(135deg, #fff0e1 0%, #fce4c4 100%)",
        boxShadow: "0 0 20px rgba(255, 182, 91, 0.3)",
        width: "90%",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      
      {/* Izquierda: barras de progreso */}
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <h3 style={{ color: "#ff6f61", textAlign: "center", marginBottom: "15px" }}>
          Progreso por Actividad
        </h3>

        {ejercicios.map((ej, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <p style={{ marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
              {ej.nombre}
            </p>
            <BarraProgreso value={ej.progreso} />
          </div>
        ))}
      </div>

      {/* Derecha: gráfico circular */}
      <div
        style={{
          flexBasis: "300px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "#ff6f61", marginBottom: "10px" }}>Progreso Global</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dataPie}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {dataPie.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <p style={{ fontWeight: "bold", color: "#333", marginTop: "10px", fontSize: "1.1rem" }}>
          Promedio: {Math.round(promedio)}%
        </p>
      </div>
    </div>
  );
};

export default ProgresoGlobal;

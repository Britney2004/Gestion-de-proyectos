import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import BarraProgreso from '../../components/BarraProgreso'; // 1. Importa la barra
import { supabase } from "../../Supabase/Cliente"; // Asegúrate de tener esta línea al inicio


// Preguntas y respuestas
const questionsData = [
  {
    question: "¿Cuál es el componente que ejecuta las instrucciones y procesa los datos?",
    options: ["Disco Duro", "Procesador (CPU)", "Memoria RAM", "Fuente de Poder"],
    answer: "Procesador (CPU)"
  },
  {
    question: "¿Qué componente almacena datos de manera temporal?",
    options: ["Placa Base", "Memoria RAM", "Disco Duro", "Fuente de Poder"],
    answer: "Memoria RAM"
  },
  {
    question: "¿Cuál es la función principal de la fuente de poder?",
    options: [
      "Procesar datos",
      "Almacenar información",
      "Convertir corriente eléctrica",
      "Conectar periféricos"
    ],
    answer: "Convertir corriente eléctrica"
  },
  {
    question: "¿Qué componente se encarga de procesar gráficos?",
    options: ["CPU", "GPU", "RAM", "SSD"],
    answer: "GPU"
  },
  {
    question: "¿Dónde se almacenan los datos de forma permanente?",
    options: ["RAM", "CPU", "Disco Duro / SSD", "Fuente de Poder"],
    answer: "Disco Duro / SSD"
  },
  {
    question: "¿Cuál es la función principal de la placa base?",
    options: [
      "Almacenar datos",
      "Conectar y comunicar los componentes",
      "Procesar gráficos",
      "Proveer energía"
    ],
    answer: "Conectar y comunicar los componentes"
  }
];

// Función para mezclar un array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HardwareTest() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progreso, setProgreso] = useState(0); // 2. Estado para progreso

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
        .update({ hardware: progreso }) // Usa la columna correcta, por ejemplo: hardware
        .eq("id", data.id);
    }

    guardarProgreso();
  }, [progreso]);

  // mezcla preguntas y respuestas
  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionsData).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffledQuestions);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setProgreso(0); // Reinicia progreso al reiniciar
  }, []);

  // 3. Actualiza el progreso cada vez que el usuario responde
  useEffect(() => {
    if (questions.length > 0) {
      setProgreso((current / questions.length) * 100);
    }
  }, [current, questions.length]);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      if (option === questions[current].answer) {
        setScore(s => s + 1);
        setProgreso(prev => prev + (100 / questions.length)); // Solo avanza si es correcta
      }
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        setProgreso(100); // 100% al finalizar
      }
    }, 700);
  };

  const handleRestart = () => {
    const shuffledQuestions = shuffleArray(questionsData).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffledQuestions);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setProgreso(0); // Reinicia progreso
  };

  return (
    <>
      <NavBar />
      <div style={{
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          padding: '2rem 1rem',
          zIndex: 2,
          position: 'relative'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 30,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            padding: '2rem 2rem',
            maxWidth: 500,
            width: '100%',
            margin: '2rem 0'
          }}>
            {/* 4. Barra de progreso */}
            <div style={{ marginBottom: 24 }}>
              <BarraProgreso value={progreso} />
            </div>
            {!showResult && questions.length > 0 ? (
              <>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  fontWeight: 'bold',
                  marginBottom: 24,
                  color: '#a51d2d'
                }}>
                  Pregunta {current + 1} de {questions.length}
                </h2>
                <p style={{ fontSize: 20, marginBottom: 32, color: '#222', fontWeight: 500 }}>
                  {questions[current].question}
                </p>
                <div>
                  {questions[current].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      disabled={!!selectedOption}
                      style={{
                        display: 'block',
                        width: '100%',
                        margin: '0.5rem 0',
                        padding: '1rem',
                        fontSize: 18,
                        fontWeight: 'bold',
                        borderRadius: 10,
                        border: selectedOption
                          ? opt === questions[current].answer
                            ? '2px solid #28a745'
                            : opt === selectedOption
                              ? '2px solid #a51d2d'
                              : '2px solid #ccc'
                          : '2px solid #ccc',
                        background: selectedOption
                          ? opt === questions[current].answer
                            ? '#d4edda'
                            : opt === selectedOption
                              ? '#f8d7da'
                              : '#fff'
                          : '#fff',
                        color: selectedOption
                          ? opt === questions[current].answer
                            ? '#155724'
                            : opt === selectedOption
                              ? '#721c24'
                              : '#222'
                          : '#222',
                        cursor: selectedOption ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#a51d2d', fontSize: 32, fontWeight: 'bold' }}>¡Test finalizado!</h2>
                <p style={{ fontSize: 22, margin: '1.5rem 0' }}>
                  Tu puntaje: <b>{score}</b> de <b>{questions.length}</b>
                </p>
                <button
                  onClick={handleRestart}
                  style={{
                    background: '#a51d2d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    padding: '1rem 2.5rem',
                    fontWeight: 'bold',
                    fontSize: 20,
                    cursor: 'pointer',
                    marginRight: 16,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  Reintentar
                </button>
                <button
                  onClick={() => navigate('../Ejercicios.js')}
                  style={{
                    background: '#fff',
                    color: '#a51d2d',
                    border: '2px solid #a51d2d',
                    borderRadius: 10,
                    padding: '1rem 2.5rem',
                    fontWeight: 'bold',
                    fontSize: 20,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  Volver a la teoría
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Botón Volver fijo */}
        <div style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          padding: '1.5rem 2rem',
          zIndex: 10
        }}>
          <button
            onClick={() => navigate('/ejercicios')}
            style={{
              background: '#a51d2d',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '1rem 2.5rem',
              fontWeight: 'bold',
              fontSize: 20,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            &#8592; Volver
          </button>
        </div>
      </div>
    </>
  );
}
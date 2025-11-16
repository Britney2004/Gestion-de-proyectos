import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './paginas/Login';
import Home from "./paginas/Home";
import NotFound from "./paginas/NotFound";
import { supabase } from "./Supabase/Cliente";
import { TaskContextProvider } from "./context/TaskContext";
import Register from "./paginas/Register";
import Ahoracado from "./paginas/Ejercicios/Ahoracado";
import Servicios from "./paginas/Servicios";
import Secciones from "./paginas/Secciones";
import Trivia from "./paginas/Ejercicios/Trivia";
import Ejercicios from "./paginas/Ejercicios";
import Sopa_de_Letras from "./paginas/Ejercicios/Sopa_de_Letras";
import HardwareInfo from "./paginas/HardwareInfo";
import HardwareTest from "./paginas/Ejercicios/HardwareTest";
import Progreso_general from "./paginas/Progreso_general";
import Software from "./paginas/Software";

function App() {

    const navigate = useNavigate();

useEffect(() => {
    const allowed = ["/login", "/register"];
    supabase.auth.onAuthStateChange((event, session) => {
        if (!session && !allowed.includes(window.location.pathname)) {
            navigate('/login');
        }
    });
}, [navigate]);

    return (    
        <div className="App">
            <TaskContextProvider>
                <Routes>
                    <Route path="/123" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/ahorcado" element={<Ahoracado />} />
                    <Route path="/" element={<Secciones />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/trivia" element={<Trivia />} />
                    <Route path="/ejercicios" element={<Ejercicios />} />
                    <Route path="/sopa-de-letras" element={<Sopa_de_Letras />} />
                    <Route path="/hardware" element={<HardwareInfo />} />
                    <Route path="/software" element={<Software />} />
                    <Route path="/hardware-test" element={<HardwareTest />} />
                    <Route path="/analisis" element={<Progreso_general />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </TaskContextProvider>

        </div>
    );
}

export default App;
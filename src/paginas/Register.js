import { useState, useEffect } from "react";
import { supabase } from "../Supabase/Cliente";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });
            if (error) {
                if (
                    error.message.includes("already registered") ||
                    error.message.includes("User already registered") ||
                    error.message.includes("already exists")
                ) {
                    setError("El usuario ya está registrado. Por favor inicia sesión.");
                } else {
                    setError(error.message);
                }
            } else {
                setSuccess("Registro exitoso. Revisa tu correo para confirmar la cuenta.");
                setEmail("");
                setPassword("");
            }
        } catch (error) {
            setError("Error al registrar usuario");
        }
    };

    useEffect(() => {
        // Si el usuario ya está autenticado, redirige
        supabase.auth.getUser().then(({ data }) => {
            if (data?.user) {
                navigate("/");
            }
        });
    }, [navigate]);


    return (
        <>
            <NavBar />
            <div className="d-flex justify-content-center">
                <div className="card p-4 shadow" style={{width: "40%", height: "50%", marginTop: "10%"}}>
                    <h3 className="mb-4 text-center">Registro de Estudiante</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <button type="submit" className="btn btn-danger w-100">Registrarse</button>
                    </form>
                    <button className="btn link-danger w-100 mt-2" onClick={() => navigate("/login")}>¿Ya tienes cuenta? Inicia sesión</button>
                </div>
            </div>
        </>
    );
}

export default Register;

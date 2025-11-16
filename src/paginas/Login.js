import { useState, useEffect } from "react";
import { supabase } from "../Supabase/Cliente";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) {
                setError(error.message);
            } else {
                navigate("/"); // Redirige al home o dashboard
            }
        } catch (err) {
            setError("Error de inicio de sesión");
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
            <div className="card p-4 shadow" style={{ minWidth: "350px", width: "50%", marginTop: "10%" }}>
                <h3 className="mb-4 text-center">Iniciar Sesión</h3>
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
                    <button type="submit" className="btn btn-danger w-100">Ingresar</button>
                </form>
                <button className="btn link-danger w-100 mt-2" onClick={() => navigate("/register")}>¿No tienes cuenta? Regístrate</button>
            </div>
        </div>
        </>
    );
}
export default Login;
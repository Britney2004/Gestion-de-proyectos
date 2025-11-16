function DibujoAhorcado({ fallos }) {
    return (
        <div style={{ position: "relative", height: "250px", width: "200px", margin: "20px auto" }}>
            {/* Base */}
            <div style={{ height: "10px", width: "150px", backgroundColor: "black", position: "absolute", bottom: 0, left: 0 }} />
            {/* Poste vertical */}
            <div style={{ height: "200px", width: "10px", backgroundColor: "black", position: "absolute", bottom: 0, left: "20px" }} />
            {/* Bar horizontal */}
            <div style={{ height: "10px", width: "100px", backgroundColor: "black", position: "absolute", top: 0, left: "20px" }} />
            {/* Cuerda */}
            <div style={{ height: "30px", width: "5px", backgroundColor: "black", position: "absolute", top: "10px", left: "110px" }} />

            {/* Cabeza */}
            {fallos > 0 && (
                <div style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    border: "5px solid black",
                    position: "absolute",
                    top: "40px",
                    left: "90px"
                }} />
            )}

            {/* Cuerpo */}
            {fallos > 1 && (
                <div style={{
                    height: "70px",
                    width: "10px",
                    backgroundColor: "black",
                    position: "absolute",
                    top: "80px",
                    left: "110px"
                }} />
            )}

            {/* Brazo Izquierdo */}
            {fallos > 2 && (
                <div style={{
                    height: "10px",
                    width: "40px",
                    backgroundColor: "black",
                    position: "absolute",
                    top: "90px",
                    left: "70px",
                    transform: "rotate(45deg)",
                    transformOrigin: "right"
                }} />
            )}

            {/* Brazo Derecho */}
            {fallos > 3 && (
                <div style={{
                    height: "10px",
                    width: "40px",
                    backgroundColor: "black",
                    position: "absolute",
                    top: "90px",
                    left: "110px",
                    transform: "rotate(-45deg)",
                    transformOrigin: "left"
                }} />
            )}

            {/* Pierna Izquierda */}
            {fallos > 4 && (
                <div style={{
                    height: "10px",
                    width: "40px",
                    backgroundColor: "black",
                    position: "absolute",
                    top: "150px",
                    left: "80px",
                    transform: "rotate(-45deg)",
                    transformOrigin: "right"
                }} />
            )}

            {/* Pierna Derecha */}
            {fallos > 5 && (
                <div style={{
                    height: "10px",
                    width: "40px",
                    backgroundColor: "black",
                    position: "absolute",
                    top: "150px",
                    left: "110px",
                    transform: "rotate(45deg)",
                    transformOrigin: "left"
                }} />
            )}
        </div>
    );
}

export default DibujoAhorcado;
import { useEffect } from "react";
import { useTareas } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList({Completado = false}) {

    // usa task de Tareas context
    const { Tareas, getTareas, loading } = useTareas();

    useEffect(() => {
        getTareas(Completado);
    }, [Completado]);

    function renderTareas() {
            if (loading) {
        return (<h1>Cargando...</h1>)
    }
    else if (Tareas.length === 0) {
        return (<h1>No hay tareas aun</h1>)
    }
    else {
    
    return (<div>
        <h1>Lista de Tareas</h1>
        {Tareas.map(Tarea => (
            <TaskCard Tarea={Tarea} />
        ))}
    </div>);
    }}
    return (
        <div> {renderTareas()} </div>
    )
}


export default TaskList;
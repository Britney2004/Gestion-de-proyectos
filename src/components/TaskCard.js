import TaskList from './TaskList';
import { useTareas } from "../context/TaskContext";


function TaskCard({ Tarea }) {

    const { DeleteTarea, updateTarea } = useTareas();
    
    const handleDelete = () => {
        DeleteTarea(Tarea.id)
    }

    const handleSubmit = () => {
        updateTarea(Tarea.id, { Completado: !Tarea.Completado })
    }

    return (
        <div>
            <h1>{Tarea.nombre}</h1>
            <p>{JSON.stringify(Tarea.Completado)}</p>
            <div>
                <button onClick={handleDelete}>Eliminar</button>
                <button onClick={handleSubmit}>Editar</button>
            </div>
        </div>
    );
}

export default TaskCard;

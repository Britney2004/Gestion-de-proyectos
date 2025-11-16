import { useState } from "react";
import { supabase } from "../../Supabase/Cliente";
import {useTareas} from "../../context/TaskContext";

function TaskForm() {

  const [NombreTarea, setNombreTarea] = useState("");
  const {CrearTarea, adding} = useTareas();

  //Funcion para manejar el envio del formulario
 
  const handleSubmit = async (e) => {
     //Se evita el comportamiento por defecto del formulario
    e.preventDefault();
    CrearTarea(NombreTarea);
    setNombreTarea("");
  }



  //Formulario para agregar tareas
  //Cada que se escribe en el input se actualiza la variable NombreTarea
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          nombre="NombreTarea"
          placeholder="Task Title"
          onChange={(e) => setNombreTarea(e.target.value)}
          value={NombreTarea}
           />

         {/* El boton se deshabilita si se esta agregando una tarea */}
        <button disabled = {adding}> 
          {adding ? "Agregando..." : "Agragar Tarea"}
           </button>
      </form>
    </div>

  )
}

export default TaskForm
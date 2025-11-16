import { createContext, useContext, useState } from "react";
import { supabase } from "../Supabase/Cliente";

export const TaskContext = createContext()


export const useTareas = () => {
    const context = useContext(TaskContext)
    // hace una excepcion
    if (!context) throw new Error("Usa a task we");
    return context
}

// children son los componentes que van a estar dentro del provider
export const TaskContextProvider = ({ children }) => {
    // el usestate sirve para una variable que se cambia a si misma 
    const [Tareas, setTareas] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);


    const getTareas = async (Completado = false) => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from("Tareas")
            .select()
            .eq("userId", user.id)
            .eq("Completado", Completado);

        if (error) throw error;
        setTareas(data);
        setLoading(false);
    }

    // en async resive un parametro
    const CrearTarea = async (NombreTarea) => {
        setAdding(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            //Se hace la coneccion con bases de datos para insertar el nombre de task
            const { data, error } = await supabase
                .from("Tareas")
                .insert({
                    nombre: NombreTarea,
                    userId: user.id
                })
                .select(); //QUE PASA SI LO BORRO? = no hace coneccion con CrearTarea

            if (error) throw error;
            //se hace una copia de los arreglos y los muestra en la pantalla inmediatamente, esta conectado con provider
            setTareas([...Tareas, ...data])

        }
        catch (error) {
            console.error(error);
        } finally {
            setAdding(false)
        }

    }

    const DeleteTarea = async (id) => {


            const { data: { user } } = await supabase.auth.getUser();
            //Se hace la coneccion con bases de datos para insertar el nombre de task
            const { data, error } = await supabase
                .from("Tareas")
                .delete()
                .eq('userId', user.id)
                .eq('id', id)

            if (error) throw error;
            setTareas(Tareas.filter(tarea => tarea.id !== id));

    }

    const updateTarea = async (id, updateFields) => {    

        const { data: { user } } = await supabase.auth.getUser();
        //Se hace la coneccion con bases de datos para insertar el nombre de task
        const { error, data } = await supabase
            .from("Tareas")
            .update( updateFields )
            .eq('userId', user.id)
            .eq('id', id)
            .select(); // <-- Esto retorna el registro actualizado

        if (error) throw error;
        setTareas(Tareas.filter (tarea => tarea.id !== id));
    }



    // lo que quiero compartir con value y todas las funciones que se pueden ejecutar
    return (<TaskContext.Provider
        value={{ Tareas, getTareas, CrearTarea, adding, loading, DeleteTarea, updateTarea }}>
        {children}
    </TaskContext.Provider>)
}
import React, { useState, useEffect, use } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';

export default function Home() {


    const [task, setTask] = useState([])


    useEffect(() => {
        // Obtener la lista de locales y sus horarios disponibles desde la API
        getTasks()
    }, []);


    async function deleteTask(id) {

        try {

            const response = await axios.delete(`http://localhost:8000/api/task/${id}`)


            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Se ha eliminado al tarea!',
                allowOutsideClick: false,
                showConfirmButton: true,
            });






        } catch (error) {

        }
    }


    async function getTasks() {

        try {
            const response = await axios.get("http://localhost:8000/api/task")


            console.log(response.data.tasks)
            setTask(response.data.tasks)

        } catch (error) {

            console.log(error)

        }

    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <a href="/create"><button className='btn btn-success'>Crear nueva tarea</button></a>
                    <div className="col-sm mt-5">
                        <h1>Lista de tareas</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tarea</th>
                                    <th>Descripción</th>
                                    <th>Duración</th>
                                    <th>Completada</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {task.map((tarea) => (
                                    <tr key={tarea._id}>
                                        <td>{tarea.name}</td>
                                        <td>{tarea.description}</td>
                                        <td>{tarea.duration}</td>
                                        <td>{tarea.completed}</td>
                                        <td><button className="btn btn-success ml-2">Editar</button></td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteTask(tarea._id)} // Call deleteTask with task id
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

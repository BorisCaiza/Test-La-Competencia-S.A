import React, { useState, useEffect, use } from 'react';
import { Link } from 'react-router-dom';
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

            const confirmResult = await Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro?',
                text: '¿Deseas eliminar esta tarea?',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No',
                allowOutsideClick: false,
                showConfirmButton: true,
            });

            if (confirmResult.isConfirmed) {
                // Si el usuario confirma, elimina la tarea
                await axios.delete(`http://localhost:8000/api/task/${id}`);

                // Muestra un mensaje de éxito después de eliminar la tarea
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Se ha eliminado la tarea!',
                    allowOutsideClick: false,
                    showConfirmButton: true,
                });

                // Actualiza la lista de tareas después de eliminar
                getTasks();
            }



        } catch (error) {

        }
    }


    async function getTasks() {

        try {
            const response = await axios.get("http://localhost:8000/api/task");

            // Filtra las tareas con completed: 'no'
            const filteredTasks = response.data.tasks.filter((task) => task.completed === 'no');

            console.log(filteredTasks);
            setTask(filteredTasks);
        } catch (error) {
            console.log(error);
        }


    }


    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <h1>Agenda de Tareas</h1>
                    <a href="/create"><button className='btn btn-success mt-3'>Crear nueva tarea</button></a>
                    <div className="col-sm mt-5">
                        <h1>Lista de tareas</h1>
                        {task.length === 0 ? (
                            <p>Haz terminado todas tus tareas, crea una nueva.</p>
                        ) : (
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
                                            <td>
                                                <Link to={`/edit/${tarea._id}`}>
                                                    <button className="btn btn-success ml-2">Editar</button>
                                                </Link>
                                            </td>
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
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}    
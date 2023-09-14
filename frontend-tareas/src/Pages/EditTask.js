import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function EditTask() {
    const { id } = useParams();
    const [value, setValue] = useState('')
    const [task, setTask] = useState({
        name: '',
        duration: '',
        completed: false,
        description: '',
    });

    useEffect(() => {
        const getTaskToEdit = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/task/${id}`);
                setTask(response.data.task);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getTaskToEdit();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    /*const handleSelectChange = (e) => {
        setValue(e.target.value)
    };*/

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        setTask({
            ...task,
            completed: selectedValue,
        });
    };


    const editTask = async () => {
        try {

            const body = {
                name: task.name,
                duration: task.duration,
                completed: value,
                description: task.description
            };


            console.log("body", body)

            const response = await axios.put(`http://localhost:8000/api/task/${id}`, body);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: '¡Se ha editado la tarea!',
                allowOutsideClick: false,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location = `/`; // Redirigir al usuario a la página de inicio
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar la tarea',
                allowOutsideClick: false,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location = `/`; // Redirigir al usuario a la página de inicio
                }
            });
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <h1>Edita la Tarea</h1>
                <div className='col-sm-5'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="name"
                                className="form-control"
                                placeholder="Nombre"
                                value={task.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción:</label>
                            <input
                                type="text"
                                id="descripcion"
                                name="description"
                                className="form-control"
                                placeholder="Descripción"
                                value={task.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duracion">Duración: (minutos)</label>
                            <input
                                type="number"
                                id="duracion"
                                name="duration"
                                className="form-control"
                                placeholder="Duración"
                                value={task.duration}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="completed">Completado:</label>
                            <select
                                id="completed"
                                name="completed"
                                className="form-control"
                                value={value}
                                onChange={handleSelectChange}
                            >
                                <option value="si">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-primary mt-2" onClick={editTask}>
                            Editar Tarea
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

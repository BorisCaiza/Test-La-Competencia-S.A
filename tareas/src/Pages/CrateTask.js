import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CreateTask() {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [completed, setCompleted] = useState(false);
    const [description, setDescription] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleCompletedChange = (e) => {
        setCompleted(e.target.checked);
    };

    async function createTask() {
        const body = {
            name: name,
            duration: duration,
            completed: completed,
            description: description
        };

        try {
            const response = await axios.post("http://localhost:8000/api/task", body);

            console.log(response)

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: '¡Se ha creado la tarea!',
                allowOutsideClick: false,
                showConfirmButton: true,
            });

            // const history = useHistory();
            // history.push('/');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-5'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="form-control"
                                placeholder="Nombre"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción:</label>
                            <input
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                className="form-control"
                                placeholder="Descripción"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duracion">Duración:</label>
                            <input
                                type="text"
                                id="duracion"
                                name="duracion"
                                className="form-control"
                                placeholder="Duración"
                                value={duration}
                                onChange={handleDurationChange}
                                required
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={createTask}>
                            Crear Tarea
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

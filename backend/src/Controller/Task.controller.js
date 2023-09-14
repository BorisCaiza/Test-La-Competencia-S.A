const taskModel = require("../model/Task.mode");
const mongoose = require('mongoose');


const tasklCtrl = {};

//obtener servicios

tasklCtrl.getTasks = async (req, res) => {


    let tasks = await taskModel.find()

    //console.log(suppliers)

    if (tasks.length > 0) {

        res.status(200).send({
            status: true,
            tasks: tasks
        })

    } else {
        res.status(400).send({
            status: false,
            message: "No exiten tareas"
        })
    }
}

//Obtener servicio

tasklCtrl.getTask = async (req, res) => {

    let id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).send({
            status: false,
            message: "Id no valido"
        })

    }





    let task = await taskModel.findById(id)

    console.log(task)

    if (!task) {

        res.status(400).send({
            status: false,
            message: "No existe la tarea"
        })

    } else {

        try {

            res.status(200).send({
                status: true,
                task: task
            })

        } catch (error) {
            res.json({
                status: false,
                message: "Error al encontrar el local"
            });

        }




    }
}






//Crear servicio
tasklCtrl.create = async (req, res) => {



    let date = new Date();
    let strTime = date.toLocaleString("en-US", { timeZone: "America/Bogota" });
    const { name, description, duration, completed } = req.body;


    try {

        const task = new taskModel({
            name: name,
            description: description,
            duration: duration,
            completed: "no"
        })

        await task.save()

        res.status(200).send({
            status: true,
            message: "Tarea Creada"
        })

    } catch (error) {


        res.status(400).send({
            status: true,
            message: "Error al crear la tarea"
        })


    }









}

//Actualziar servicio


tasklCtrl.update = async (req, res) => {

    let date = new Date();
    let strTime = date.toLocaleString("en-US", { timeZone: "America/Bogota" });
    const { name, duration, completed, description } = req.body;

    let task = await taskModel.findById(req.params.id)

    if (!task) {

        res.status(400).send({
            status: false,
            message: "No existe el proovedor"
        })

    } else {


        try {

            if (task) {
                const newTask = {
                    name: name,
                    duration: duration,
                    completed: completed,
                    description: description

                };

                await taskModel.findByIdAndUpdate(req.params.id, supplierNew, { userFindAndModify: false });

                res.status(200).send({
                    status: true,
                    message: "Tarea actualizado"
                })

            } else {
                res
                    .status(400).send({
                        status: false,
                        message: "El nombre debe ser obligatorio"
                    })
            }
        } catch (error) {

            logger.error('Error al actualziar el proveedor' + error)
            res.json({
                status: false,
                message: "Error al actualizar el proveedor"
            });
        }


    }

}




//Eliminar servicio

tasklCtrl.delete = async (req, res) => {

    let id = req.params.id

    console.log("entree")

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).send({
            status: false,
            message: "Id no valido"
        })

    }


    let task = await taskModel.findById(id)

    if (!task) {

        res.status(400).send({
            status: false,
            message: "No la tarea"
        })

    } else {

        try {

            await taskModel.findByIdAndDelete(id, { userFindAndModify: false });

            res.status(200).send({
                status: true,
                message: "Tarea Eliminada"
            })

        } catch (error) {

            res.json({
                status: false,
                message: "Error al eliminar la tarea"
            });

        }




    }
}


module.exports = tasklCtrl;

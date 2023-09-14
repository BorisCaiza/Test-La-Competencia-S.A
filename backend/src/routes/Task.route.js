const express = require('express');
const router = express.Router();
const taskCtrl = require('../Controller/Task.controller');
const tasklCtrl = require('../Controller/Task.controller');




//Obtener todos
router.get('/task', taskCtrl.getTasks);
//Obtener uno
router.get('/task/:id', taskCtrl.getTask);

router.post('/task', taskCtrl.create);

router.delete("/task/:id", taskCtrl.delete)

router.post("/task", tasklCtrl.update)


module.exports = router;
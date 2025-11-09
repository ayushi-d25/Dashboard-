const express  = require("express")
const { getAllTasks, createTask, updateTask, deleteTask } = require("../service/taskService")
const { authenticate } = require("../middleware/authentication")


const taskRouter = express.Router()

taskRouter.get('/', 
    authenticate,
    getAllTasks
)

taskRouter.post('/', 
    authenticate,
    createTask
)

taskRouter.put('/:id', 
    authenticate,
    updateTask
)

taskRouter.delete('/:id', 
    authenticate,
    deleteTask
)

module.exports = taskRouter

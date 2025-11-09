const Task = require('../models/taskSchema'); // import Task model
const { ConflictError, CustomErrorHandler, UnauthorizedError, NotFoundError, BadRequest } = require('../utils/customErrorHandler');
const mongoose = require('mongoose');

module.exports.createTask = async (req, res, next) => {
    const { title, description, status } = req.body;

    if (!title) throw new BadRequest('Title is required');
    if (!description) throw new BadRequest('Description is required');
    if (!status) throw new BadRequest('Status is required');

    const owner = new mongoose.Types.ObjectId(req.user.id);

    const existingTask = await Task.findOne({ title, owner });
    if (existingTask) {
        throw new ConflictError('Task already exists');
    }

    const newTask = await Task.create({
        owner,
        title,
        description,
        status: status || 'pending',
    });

    res.locals.status = 201;
    res.locals.message = 'Task Created';
    res.locals.data = newTask;
    next();
};

module.exports.updateTask = async (req, res, next) => {
    const task = { ...req.body };
    try {
        const checkTask = await Task.findById(req.params.id).populate('owner', 'name');
        if (!checkTask) {
            throw new NotFoundError("Task does not exist");
        }
        if (req.user.id.toString() !== checkTask.owner._id.toString()) {
            throw new UnauthorizedError("Unauthorized");
        }

        if (!task.title) throw new BadRequest('Title is required');
        if (!task.description) throw new BadRequest('Description is required');
        if (!task.status) throw new BadRequest('Status is required');

        checkTask.title = task.title;
        checkTask.description = task.description;
        checkTask.status = task.status || checkTask.status;
        await checkTask.save();

        res.locals.status = 201;
        res.locals.message = "Task Updated Successfully";
        res.locals.data = checkTask;
        next();
    } catch (e) {
        throw new CustomErrorHandler(e);
    }
};

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const listTasks = await Task.find({ owner: req.user.id });
        res.locals.status = 200;
        res.locals.message = "Successful Request";
        res.locals.data = listTasks;
        next();
    } catch (e) {
        throw new CustomErrorHandler(e);
    }
};

module.exports.deleteTask = async (req, res, next) => {
    const id = req.params.id;

    try {
        const task = await Task.findById(id).populate('owner', 'name');
        if (!task) {
            throw new NotFoundError('Task does not exist');
        }

        if (task.owner._id.toString() !== req.user.id.toString()) {
            throw new UnauthorizedError('Unauthorized');
        }

        await Task.findByIdAndDelete(id);

        res.locals.status = 200;
        res.locals.message = 'Task Deleted Successfully';
        res.locals.data = {
            title: task.title,
            description: task.description,
            owner: task.owner.name,
        };

        next();
    } catch (e) {
        throw new CustomErrorHandler(e);
    }
};

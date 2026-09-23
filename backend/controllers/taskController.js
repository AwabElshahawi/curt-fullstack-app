const Task = require('../models/task');
const Project = require('../models/project');

async function createTask(req, res) {
    try {
        const { title, description, status, priority, project, assignedTo, dueDate } = req.body;
        console.log('req.body:', req.body);
        console.log('project value:', JSON.stringify(project));
        if (!title || !project) {
            return res.status(400).json({ success: false, message: 'Please provide task title and project' });
        }
        
        const projectExists = await Project.findById(project);
        if (!projectExists) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        const newTask = await Task.create({ title, description, status, priority, project, assignedTo, dueDate });
        
        res.status(201).json({ success: true, 
            message: 'Task created successfully', 
            task: newTask 
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
async function getTasks(req, res) {
    try {
        const tasks = await Task.find().populate('project', 'name').populate('assignedTo', 'username email');
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }

}

async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id).populate('project', 'name').populate('assignedTo', 'username email');
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, task });
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }   
}

async function updateTask(req, res) {
    try {
        const { title, description, status, priority, project, assignedTo, dueDate } = req.body;
        const taskId = req.params.id;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status, priority, project, assignedTo, dueDate }, { new: true }).populate('project', 'name').populate('assignedTo', 'username email');
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
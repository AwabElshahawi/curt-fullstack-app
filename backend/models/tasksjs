const mongoose = require('mongoose');

const taskStatusEnum = ['To Do', 'In Progress', 'Done'];
const taskPriorityEnum = ['Low', 'Medium', 'High'];

//Define the Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,    
        trim: true,
    },
    status: {
        type: String,
        enum: taskStatusEnum,
        default: 'To Do',
        required: true,
    },
    priority: {
        type: String,
        enum: taskPriorityEnum,
        default: 'Medium',
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
},
    {timestamps: true,}
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;  

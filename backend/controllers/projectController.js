const Project = require('../models/projectModel');

async function createProject(req, res) {
    try {
        const { name, description, owner } = req.body;

        if (!name || !owner) {
            return res.status(400).json({ success: false, message: 'Please provide project name and owner' });
        }

        const newProject = await Project.create({ name, description, owner });
        res.status(201).json({ success: true, message: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function getProjects(req, res) {
    try {
        const projects = await Project.find().populate('owner', 'username email').populate('members', 'username email');
        res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
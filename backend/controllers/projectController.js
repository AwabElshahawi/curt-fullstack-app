const Project = require('../models/project');

async function createProject(req, res) {
    try {
        const { name, description, owner } = req.body;

        if (!name || !owner) {
            return res.status(400).json({ success: false, message: 'Please provide project name and owner' });
        }

        const newProject = await Project.create({ name, description, owner });
        
        res.status(201).json({ success: true, 
            message: 'Project created successfully', 
            project: newProject 
        });

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

async function getProjectsByID(req, res) {
    try {
        const project = await Project.findById(req.params.id).populate('owner', 'username email').populate('members', 'username email');
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function updateProject(req, res) {
    try {
        const { name, description, owner } = req.body;
        const projectId = req.params.id;

        const updatedProject = await Project.findByIdAndUpdate(projectId, { name, description, owner }, { new: true }).populate('owner', 'username email').populate('members', 'username email');

        if (!updatedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        res.status(200).json({ success: true, project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}



module.exports = { createProject, getProjects, getProjectsByID, updateProject, deleteProject };
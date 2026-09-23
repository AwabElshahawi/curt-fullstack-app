const express = require('express');
const router = express.Router();
const { createProject , getProjects , getProjectsByID, updateProject, deleteProject } = require('../controllers/projectController');


// Endpoints for project management
router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectsByID);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// Get all estudiantes
router.get('/', estudianteController.getAllEstudiantes);

// Get estudiante by ID
router.get('/:id', estudianteController.getEstudianteById);

// Create a new estudiante
router.post('/', estudianteController.createEstudiante);

// Update an existing estudiante
router.put('/:id', estudianteController.updateEstudiante);

// Delete an estudiante
router.delete('/:id', estudianteController.deleteEstudiante);

module.exports = router;
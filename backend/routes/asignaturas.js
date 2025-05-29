const express = require('express');
const router = express.Router();
const asignaturaController = require('../controllers/asignaturaController');

// Get all asignaturas
router.get('/', asignaturaController.getAllAsignaturas);

// Get asignatura by ID
router.get('/:id', asignaturaController.getAsignaturaById);

// Create a new asignatura
router.post('/', asignaturaController.createAsignatura);

// Update an existing asignatura
router.put('/:id', asignaturaController.updateAsignatura);

// Delete an asignatura
router.delete('/:id', asignaturaController.deleteAsignatura);

module.exports = router;
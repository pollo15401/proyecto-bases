const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');

// Get all docentes
router.get('/', docenteController.getAllDocentes);

// Get docente by ID
router.get('/:id', docenteController.getDocenteById);

// Create a new docente
router.post('/', docenteController.createDocente);

// Update an existing docente
router.put('/:id', docenteController.updateDocente);

// Delete an docente
router.delete('/:id', docenteController.deleteDocente);

module.exports = router;
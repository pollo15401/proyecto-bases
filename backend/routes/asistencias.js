const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Get all asistencias
router.get('/', asistenciaController.getAllAsistencias);

// Get asistencia by ID
router.get('/:id', asistenciaController.getAsistenciaById);

// Create a new asistencia
router.post('/', asistenciaController.createAsistencia);

// Update an existing asistencia
router.put('/:id', asistenciaController.updateAsistencia);

// Delete an asistencia
router.delete('/:id', asistenciaController.deleteAsistencia);

module.exports = router;
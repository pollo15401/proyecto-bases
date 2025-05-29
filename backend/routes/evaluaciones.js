const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacionController');

// Get all evaluaciones
router.get('/', evaluacionController.getAllEvaluaciones);

// Get evaluacion by ID
router.get('/:id', evaluacionController.getEvaluacionById);

// Create a new evaluacion
router.post('/', evaluacionController.createEvaluacion);

// Update an existing evaluacion
router.put('/:id', evaluacionController.updateEvaluacion);

// Delete an evaluacion
router.delete('/:id', evaluacionController.deleteEvaluacion);

module.exports = router;
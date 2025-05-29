const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

// Get all grupos
router.get('/', grupoController.getAllGrupos);

// Get grupo by ID
router.get('/:id', grupoController.getGrupoById);

// Create a new grupo
router.post('/', grupoController.createGrupo);

// Update an existing grupo
router.put('/:id', grupoController.updateGrupo);

// Delete an grupo
router.delete('/:id', grupoController.deleteGrupo);

module.exports = router;
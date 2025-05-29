const Evaluacion = require('../models/evaluacion');

exports.getAllEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.getAll();
    res.json(evaluaciones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting evaluaciones' });
  }
};

exports.getEvaluacionById = async (req, res) => {
  try {
    const evaluacion = await Evaluacion.getById(req.params.id);
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluacion not found' });
    }
    res.json(evaluacion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting evaluacion' });
  }
};

exports.createEvaluacion = async (req, res) => {
  try {
    const evaluacion = {
      estudiante_id: req.body.estudiante_id,
      asignatura_id: req.body.asignatura_id,
      calificacion: req.body.calificacion,
      fecha: req.body.fecha
    };
    const newEvaluacion = await Evaluacion.create(evaluacion);
    res.status(201).json(newEvaluacion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating evaluacion' });
  }
};

exports.updateEvaluacion = async (req, res) => {
  try {
    const evaluacion = {
      estudiante_id: req.body.estudiante_id,
      asignatura_id: req.body.asignatura_id,
      calificacion: req.body.calificacion,
      fecha: req.body.fecha
    };
    const updatedEvaluacion = await Evaluacion.update(req.params.id, evaluacion);
    res.json(updatedEvaluacion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating evaluacion' });
  }
};

exports.deleteEvaluacion = async (req, res) => {
  try {
    await Evaluacion.delete(req.params.id);
    res.json({ message: 'Evaluacion deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting evaluacion' });
  }
};
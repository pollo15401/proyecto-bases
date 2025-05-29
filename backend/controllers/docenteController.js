const Docente = require('../models/docente');

exports.getAllDocentes = async (req, res) => {
  try {
    const docentes = await Docente.getAll();
    res.json(docentes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting docentes' });
  }
};

exports.getDocenteById = async (req, res) => {
  try {
    const docente = await Docente.getById(req.params.id);
    if (!docente) {
      return res.status(404).json({ message: 'Docente not found' });
    }
    res.json(docente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting docente' });
  }
};

exports.createDocente = async (req, res) => {
  try {
    const docente = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      especialidad: req.body.especialidad
    };
    const newDocente = await Docente.create(docente);
    res.status(201).json(newDocente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating docente' });
  }
};

exports.updateDocente = async (req, res) => {
  try {
    const docente = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      especialidad: req.body.especialidad
    };
    const updatedDocente = await Docente.update(req.params.id, docente);
    res.json(updatedDocente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating docente' });
  }
};

exports.deleteDocente = async (req, res) => {
  try {
    await Docente.delete(req.params.id);
    res.json({ message: 'Docente deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting docente' });
  }
};
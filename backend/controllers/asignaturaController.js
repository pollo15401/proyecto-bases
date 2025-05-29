const Asignatura = require('../models/asignatura');

exports.getAllAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignatura.getAll();
    res.json(asignaturas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting asignaturas' });
  }
};

exports.getAsignaturaById = async (req, res) => {
  try {
    const asignatura = await Asignatura.getById(req.params.id);
    if (!asignatura) {
      return res.status(404).json({ message: 'Asignatura not found' });
    }
    res.json(asignatura);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting asignatura' });
  }
};

exports.createAsignatura = async (req, res) => {
  try {
    const asignatura = {
      nombre: req.body.nombre,
      docente_id: req.body.docente_id
    };
    const newAsignatura = await Asignatura.create(asignatura);
    res.status(201).json(newAsignatura);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating asignatura' });
  }
};

exports.updateAsignatura = async (req, res) => {
  try {
    const asignatura = {
      nombre: req.body.nombre,
      docente_id: req.body.docente_id
    };
    const updatedAsignatura = await Asignatura.update(req.params.id, asignatura);
    res.json(updatedAsignatura);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating asignatura' });
  }
};

exports.deleteAsignatura = async (req, res) => {
  try {
    await Asignatura.delete(req.params.id);
    res.json({ message: 'Asignatura deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting asignatura' });
  }
};
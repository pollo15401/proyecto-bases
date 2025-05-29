const Asistencia = require('../models/asistencia');

exports.getAllAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.getAll();
    res.json(asistencias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting asistencias' });
  }
};

exports.getAsistenciaById = async (req, res) => {
  try {
    const asistencia = await Asistencia.getById(req.params.id);
    if (!asistencia) {
      return res.status(404).json({ message: 'Asistencia not found' });
    }
    res.json(asistencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting asistencia' });
  }
};

exports.createAsistencia = async (req, res) => {
  try {
    const asistencia = {
      estudiante_id: req.body.estudiante_id,
      fecha: req.body.fecha,
      estado: req.body.presente
    };
    const newAsistencia = await Asistencia.create(asistencia);
    res.status(201).json(newAsistencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating asistencia' });
  }
};

exports.updateAsistencia = async (req, res) => {
  try {
    const asistencia = {
      estudiante_id: req.body.estudiante_id,
      fecha: req.body.fecha,
      estado: req.body.estado
    };
    const updatedAsistencia = await Asistencia.update(req.params.id, asistencia);
    res.json(updatedAsistencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating asistencia' });
  }
};

exports.deleteAsistencia = async (req, res) => {
  try {
    await Asistencia.delete(req.params.id);
    res.json({ message: 'Asistencia deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting asistencia' });
  }
};
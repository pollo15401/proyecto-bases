const Estudiante = require('../models/estudiante');

exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.getAll();
    res.json(estudiantes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting estudiantes' });
  }
};

exports.getEstudianteById = async (req, res) => {
  try {
    const estudiante = await Estudiante.getById(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante not found' });
    }
    res.json(estudiante);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting estudiante' });
  }
};

exports.createEstudiante = async (req, res) => {
  try {
    const estudiante = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      fecha_nacimiento: req.body.fecha_nacimiento,
      grupo_id: req.body.grupo_id
    };
    const newEstudiante = await Estudiante.create(estudiante);
    res.status(201).json(newEstudiante);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating estudiante' });
  }
};

exports.updateEstudiante = async (req, res) => {
  try {
    const estudiante = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      fecha_nacimiento: req.body.fecha_nacimiento,
      grupo_id: req.body.grupo_id
    };
    const updatedEstudiante = await Estudiante.update(req.params.id, estudiante);
    res.json(updatedEstudiante);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating estudiante' });
  }
};

exports.deleteEstudiante = async (req, res) => {
  try {
    await Estudiante.delete(req.params.id);
    res.json({ message: 'Estudiante deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting estudiante' });
  }
};
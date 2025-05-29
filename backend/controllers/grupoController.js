const Grupo = require('../models/grupo');

exports.getAllGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.getAll();
    res.json(grupos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting grupos' });
  }
};

exports.getGrupoById = async (req, res) => {
  try {
    const grupo = await Grupo.getById(req.params.id);
    if (!grupo) {
      return res.status(404).json({ message: 'Grupo not found' });
    }
    res.json(grupo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting grupo' });
  }
};

exports.createGrupo = async (req, res) => {
  try {
    const grupo = {
      nombre_grupo: req.body.nombre_grupo,
      grado: req.body.grado,
      ciclo_escolar: req.body.ciclo_escolar
    };
    const newGrupo = await Grupo.create(grupo);
    res.status(201).json(newGrupo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating grupo' });
  }
};

exports.updateGrupo = async (req, res) => {
  try {
    const grupo = {
      nombre_grupo: req.body.nombre_grupo,
      grado: req.body.grado,
      ciclo_escolar: req.body.ciclo_escolar
    };
    const updatedGrupo = await Grupo.update(req.params.id, grupo);
    res.json(updatedGrupo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating grupo' });
  }
};

exports.deleteGrupo = async (req, res) => {
  try {
    await Grupo.delete(req.params.id);
    res.json({ message: 'Grupo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting grupo' });
  }
};
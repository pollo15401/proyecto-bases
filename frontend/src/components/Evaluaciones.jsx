import React, { useState, useEffect } from 'react';
import './Evaluaciones.css';
import { getAllEvaluaciones, createEvaluacion, updateEvaluacion, deleteEvaluacion } from '../api/evaluaciones';

const Evaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [newEvaluacion, setNewEvaluacion] = useState({ estudiante_id: '', asignatura_id: '', calificacion: '', fecha: '' });
  const [editingEvaluacionId, setEditingEvaluacionId] = useState(null);
  const [editingEvaluacion, setEditingEvaluacion] = useState({ estudiante_id: '', asignatura_id: '', calificacion: '', fecha: '' });

  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  const fetchEvaluaciones = async () => {
    try {
      const data = await getAllEvaluaciones();
      setEvaluaciones(data);
    } catch (error) {
      console.error('Error fetching evaluaciones:', error);
    }
  };

  const handleCreateEvaluacion = async (e) => {
    e.preventDefault();
    try {
      await createEvaluacion(newEvaluacion);
      fetchEvaluaciones();
      setNewEvaluacion({ estudiante_id: '', asignatura_id: '', calificacion: '', fecha: '' });
    } catch (error) {
      console.error('Error creating evaluacion:', error);
    }
  };

  const handleUpdateEvaluacion = async (e) => {
    e.preventDefault();
    try {
      await updateEvaluacion(editingEvaluacionId, editingEvaluacion);
      fetchEvaluaciones();
      setEditingEvaluacionId(null);
      setEditingEvaluacion({ estudiante_id: '', asignatura_id: '', calificacion: '', fecha: '' });
    } catch (error) {
      console.error('Error updating evaluacion:', error);
    }
  };

  const handleDeleteEvaluacion = async (id) => {
    try {
      await deleteEvaluacion(id);
      fetchEvaluaciones();
    } catch (error) {
      console.error('Error deleting evaluacion:', error);
    }
  };

  return (
    <div className="evaluaciones-container">
      <h1 className="evaluaciones-title">Evaluaciones</h1>

      <h2 className="evaluaciones-title">Create Evaluacion</h2>
      <form className="evaluaciones-form" onSubmit={handleCreateEvaluacion}>
        <input
          type="text"
          placeholder="Estudiante ID"
          value={newEvaluacion.estudiante_id}
          onChange={(e) => setNewEvaluacion({ ...newEvaluacion, estudiante_id: e.target.value })}
          className="evaluaciones-input"
        />
        <input
          type="text"
          placeholder="Asignatura ID"
          value={newEvaluacion.asignatura_id}
          onChange={(e) => setNewEvaluacion({ ...newEvaluacion, asignatura_id: e.target.value })}
          className="evaluaciones-input"
        />
        <input
          type="text"
          placeholder="Calificacion"
          value={newEvaluacion.calificacion}
          onChange={(e) => setNewEvaluacion({ ...newEvaluacion, calificacion: e.target.value })}
          className="evaluaciones-input"
        />
        <input
          type="text"
          placeholder="Fecha"
          value={newEvaluacion.fecha}
          onChange={(e) => setNewEvaluacion({ ...newEvaluacion, fecha: e.target.value })}
          className="evaluaciones-input"
        />
        <button type="submit" className="evaluaciones-button">Create</button>
      </form>

      <h2 className="evaluaciones-title">Evaluaciones List</h2>
      <ul className="evaluaciones-list">
        {evaluaciones.map((evaluacion) => (
          <li key={evaluacion.id_evaluacion} className="evaluaciones-list-item">
            {editingEvaluacionId === evaluacion.id_evaluacion ? (
              <form className="evaluaciones-form" onSubmit={handleUpdateEvaluacion}>
                <input
                  type="text"
                  value={editingEvaluacion.estudiante_id}
                  onChange={(e) => setEditingEvaluacion({ ...editingEvaluacion, estudiante_id: e.target.value })}
                  className="evaluaciones-input"
                />
                <input
                  type="text"
                  value={editingEvaluacion.asignatura_id}
                  onChange={(e) => setEditingEvaluacion({ ...editingEvaluacion, asignatura_id: e.target.value })}
                  className="evaluaciones-input"
                />
                <input
                  type="text"
                  value={editingEvaluacion.calificacion}
                  onChange={(e) => setEditingEvaluacion({ ...editingEvaluacion, calificacion: e.target.value })}
                  className="evaluaciones-input"
                />
                <input
                  type="text"
                  value={editingEvaluacion.fecha}
                  onChange={(e) => setEditingEvaluacion({ ...editingEvaluacion, fecha: e.target.value })}
                  className="evaluaciones-input"
                />
                <button type="submit" className="evaluaciones-button">Update</button>
              </form>
            ) : (
              <>
                <span className="evaluaciones-item-name">{evaluacion.estudiante_id} - {evaluacion.asignatura_id} - {evaluacion.calificacion} - {evaluacion.fecha}</span>
                <div className="evaluaciones-item-actions">
                  <button className="evaluaciones-button" onClick={() => {
                    setEditingEvaluacionId(evaluacion.id_evaluacion);
                    setEditingEvaluacion({ estudiante_id: evaluacion.estudiante_id, asignatura_id: evaluacion.asignatura_id, calificacion: evaluacion.calificacion, fecha: evaluacion.fecha });
                  }}>Edit</button>
                  <button className="evaluaciones-button" onClick={() => handleDeleteEvaluacion(evaluacion.id_evaluacion)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evaluaciones;
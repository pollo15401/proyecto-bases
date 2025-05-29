import React, { useState, useEffect } from 'react';
import './Asistencias.css';
import { getAllAsistencias, createAsistencia, updateAsistencia, deleteAsistencia } from '../api/asistencias';

const Asistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [newAsistencia, setNewAsistencia] = useState({ estudiante_id: '', fecha: '', estado: '' });
  const [editingAsistenciaId, setEditingAsistenciaId] = useState(null);
  const [editingAsistencia, setEditingAsistencia] = useState({ estudiante_id: '', fecha: '', estado: '' });

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const fetchAsistencias = async () => {
    try {
      const data = await getAllAsistencias();
      setAsistencias(data);
    } catch (error) {
      console.error('Error fetching asistencias:', error);
    }
  };

  const handleCreateAsistencia = async (e) => {
    e.preventDefault();
    try {
      await createAsistencia(newAsistencia);
      fetchAsistencias();
      setNewAsistencia({ estudiante_id: '', fecha: '', estado: '' });
    } catch (error) {
      console.error('Error creating asistencia:', error);
    }
  };

  const handleUpdateAsistencia = async (e) => {
    e.preventDefault();
    try {
      await updateAsistencia(editingAsistenciaId, editingAsistencia);
      fetchAsistencias();
      setEditingAsistenciaId(null);
      setEditingAsistencia({ estudiante_id: '', fecha: '', estado: '' });
    } catch (error) {
      console.error('Error updating asistencia:', error);
    }
  };

  const handleDeleteAsistencia = async (id) => {
    try {
      await deleteAsistencia(id);
      fetchAsistencias();
    } catch (error) {
      console.error('Error deleting asistencia:', error);
    }
  };

  return (
    <div className="asistencias-container">
      <h1 className="asistencias-title">Asistencias</h1>

      <h2 className="asistencias-title">Create Asistencia</h2>
      <form className="asistencias-form" onSubmit={handleCreateAsistencia}>
        <input
          type="text"
          placeholder="Estudiante ID"
          value={newAsistencia.estudiante_id}
          onChange={(e) => setNewAsistencia({ ...newAsistencia, estudiante_id: e.target.value })}
          className="asistencias-input"
        />
        <input
          type="text"
          placeholder="Fecha"
          value={newAsistencia.fecha}
          onChange={(e) => setNewAsistencia({ ...newAsistencia, fecha: e.target.value })}
          className="asistencias-input"
        />
        <input
          type="text"
          placeholder="Estado"
          value={newAsistencia.estado}
          onChange={(e) => setNewAsistencia({ ...newAsistencia, estado: e.target.value })}
          className="asistencias-input"
        />
        <button type="submit" className="asistencias-button">Create</button>
      </form>

      <h2 className="asistencias-title">Asistencias List</h2>
      <table className="asistencias-table">
        <thead>
          <tr>
            <th>Estudiante ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map((asistencia) => (
            <tr key={asistencia.id_asistencia}>
              <td>{asistencia.estudiante_id}</td>
              <td>{asistencia.fecha}</td>
              <td>{asistencia.estado}</td>
              <td>
                {editingAsistenciaId === asistencia.id_asistencia ? (
                  <form className="asistencias-form" onSubmit={handleUpdateAsistencia}>
                    <input
                      type="text"
                      value={editingAsistencia.estudiante_id}
                      onChange={(e) => setEditingAsistencia({ ...editingAsistencia, estudiante_id: e.target.value })}
                      className="asistencias-input"
                    />
                    <input
                      type="text"
                      value={editingAsistencia.fecha}
                      onChange={(e) => setEditingAsistencia({ ...editingAsistencia, fecha: e.target.value })}
                      className="asistencias-input"
                    />
                    <input
                      type="text"
                      value={editingAsistencia.estado}
                      onChange={(e) => setEditingAsistencia({ ...editingAsistencia, estado: e.target.value })}
                      className="asistencias-input"
                    />
                    <button type="submit" className="asistencias-button">Update</button>
                  </form>
                ) : (
                  <>
                    <button className="asistencias-button" onClick={() => {
                      setEditingAsistenciaId(asistencia.id_asistencia);
                      setEditingAsistencia({ estudiante_id: asistencia.estudiante_id, fecha: asistencia.fecha, estado: asistencia.estado });
                    }}>Edit</button>
                    <button className="asistencias-button" onClick={() => handleDeleteAsistencia(asistencia.id_asistencia)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Asistencias;
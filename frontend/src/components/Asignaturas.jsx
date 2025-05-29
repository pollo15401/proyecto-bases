import React, { useState, useEffect } from 'react';
import './Asignaturas.css';
import { getAllAsignaturas, createAsignatura, updateAsignatura, deleteAsignatura } from '../api/asignaturas';

const Asignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [newAsignatura, setNewAsignatura] = useState({ nombre: '', docente_id: '' });
  const [editingAsignaturaId, setEditingAsignaturaId] = useState(null);
  const [editingAsignatura, setEditingAsignatura] = useState({ nombre: '', docente_id: '' });

  useEffect(() => {
    fetchAsignaturas();
  }, []);

  const fetchAsignaturas = async () => {
    try {
      const data = await getAllAsignaturas();
      setAsignaturas(data);
    } catch (error) {
      console.error('Error fetching asignaturas:', error);
    }
  };

  const handleCreateAsignatura = async (e) => {
    e.preventDefault();
    try {
      await createAsignatura(newAsignatura);
      fetchAsignaturas();
      setNewAsignatura({ nombre: '', docente_id: '' });
    } catch (error) {
      console.error('Error creating asignatura:', error);
    }
  };

  const handleUpdateAsignatura = async (e) => {
    e.preventDefault();
    try {
      await updateAsignatura(editingAsignaturaId, editingAsignatura);
      fetchAsignaturas();
      setEditingAsignaturaId(null);
      setEditingAsignatura({ nombre: '', docente_id: '' });
    } catch (error) {
      console.error('Error updating asignatura:', error);
    }
  };

  const handleDeleteAsignatura = async (id) => {
    try {
      await deleteAsignatura(id);
      fetchAsignaturas();
    } catch (error) {
      console.error('Error deleting asignatura:', error);
    }
  };

  return (
    <div className="asignaturas-container">
      <h1 className="asignaturas-title">Asignaturas</h1>

      <h2 className="asignaturas-title">Create Asignatura</h2>
      <form className="asignaturas-form" onSubmit={handleCreateAsignatura}>
        <input
          type="text"
          placeholder="Nombre"
          value={newAsignatura.nombre}
          onChange={(e) => setNewAsignatura({ ...newAsignatura, nombre: e.target.value })}
          className="asignaturas-input"
        />
        <input
          type="text"
          placeholder="Docente ID"
          value={newAsignatura.docente_id}
          onChange={(e) => setNewAsignatura({ ...newAsignatura, docente_id: e.target.value })}
          className="asignaturas-input"
        />
        <button type="submit" className="asignaturas-button">Create</button>
      </form>

      <h2 className="asignaturas-title">Asignaturas List</h2>
      <ul className="asignaturas-list">
        {asignaturas.map((asignatura) => (
          <li key={asignatura.id_asignatura} className="asignaturas-list-item">
            {editingAsignaturaId === asignatura.id_asignatura ? (
              <form className="asignaturas-form" onSubmit={handleUpdateAsignatura}>
                <input
                  type="text"
                  value={editingAsignatura.nombre}
                  onChange={(e) => setEditingAsignatura({ ...editingAsignatura, nombre: e.target.value })}
                  className="asignaturas-input"
                />
                <input
                  type="text"
                  value={editingAsignatura.docente_id}
                  onChange={(e) => setEditingAsignatura({ ...editingAsignatura, docente_id: e.target.value })}
                  className="asignaturas-input"
                />
                <button type="submit" className="asignaturas-button">Update</button>
              </form>
            ) : (
              <>
                <span className="asignaturas-item-name">{asignatura.nombre} - {asignatura.docente_id}</span>
                <div className="asignaturas-item-actions">
                  <button className="asignaturas-button" onClick={() => {
                    setEditingAsignaturaId(asignatura.id_asignatura);
                    setEditingAsignatura({ nombre: asignatura.nombre, docente_id: asignatura.docente_id });
                  }}>Edit</button>
                  <button className="asignaturas-button" onClick={() => handleDeleteAsignatura(asignatura.id_asignatura)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Asignaturas;
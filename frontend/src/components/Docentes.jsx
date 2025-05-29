import React, { useState, useEffect } from 'react';
import './Docentes.css';
import { getAllDocentes, createDocente, updateDocente, deleteDocente } from '../api/docentes';

const Docentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [newDocente, setNewDocente] = useState({ nombre: '', apellido: '', especialidad: '' });
  const [editingDocenteId, setEditingDocenteId] = useState(null);
  const [editingDocente, setEditingDocente] = useState({ nombre: '', apellido: '', especialidad: '' });

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = async () => {
    try {
      const data = await getAllDocentes();
      setDocentes(data);
    } catch (error) {
      console.error('Error fetching docentes:', error);
    }
  };

  const handleCreateDocente = async (e) => {
    e.preventDefault();
    try {
      await createDocente(newDocente);
      fetchDocentes();
      setNewDocente({ nombre: '', apellido: '', especialidad: '' });
    } catch (error) {
      console.error('Error creating docente:', error);
    }
  };

  const handleUpdateDocente = async (e) => {
    e.preventDefault();
    try {
      await updateDocente(editingDocenteId, editingDocente);
      fetchDocentes();
      setEditingDocenteId(null);
      setEditingDocente({ nombre: '', apellido: '', especialidad: '' });
    } catch (error) {
      console.error('Error updating docente:', error);
    }
  };

  const handleDeleteDocente = async (id) => {
    try {
      await deleteDocente(id);
      fetchDocentes();
    } catch (error) {
      console.error('Error deleting docente:', error);
    }
  };

  return (
    <div className="docentes-container">
      <h1 className="docentes-title">Docentes</h1>

      <h2 className="docentes-title">Create Docente</h2>
      <form className="docentes-form" onSubmit={handleCreateDocente}>
        <input
          type="text"
          placeholder="Nombre"
          value={newDocente.nombre}
          onChange={(e) => setNewDocente({ ...newDocente, nombre: e.target.value })}
          className="docentes-input"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newDocente.apellido}
          onChange={(e) => setNewDocente({ ...newDocente, apellido: e.target.value })}
          className="docentes-input"
        />
        <input
          type="text"
          placeholder="Especialidad"
          value={newDocente.especialidad}
          onChange={(e) => setNewDocente({ ...newDocente, especialidad: e.target.value })}
          className="docentes-input"
        />
        <button type="submit" className="docentes-button">Create</button>
      </form>

      <h2 className="docentes-title">Docentes List</h2>
      <ul className="docentes-list">
        {docentes.map((docente) => (
          <li key={docente.id_docente} className="docentes-list-item">
            {editingDocenteId === docente.id_docente ? (
              <form className="docentes-form" onSubmit={handleUpdateDocente}>
                <input
                  type="text"
                  value={editingDocente.nombre}
                  onChange={(e) => setEditingDocente({ ...editingDocente, nombre: e.target.value })}
                  className="docentes-input"
                />
                <input
                  type="text"
                  value={editingDocente.apellido}
                  onChange={(e) => setEditingDocente({ ...editingDocente, apellido: e.target.value })}
                  className="docentes-input"
                />
                <input
                  type="text"
                  value={editingDocente.especialidad}
                  onChange={(e) => setEditingDocente({ ...editingDocente, especialidad: e.target.value })}
                  className="docentes-input"
                />
                <button type="submit" className="docentes-button">Update</button>
              </form>
            ) : (
              <>
                <span className="docentes-item-name">{docente.nombre} - {docente.apellido} - {docente.especialidad}</span>
                <div className="docentes-item-actions">
                  <button className="docentes-button" onClick={() => {
                    setEditingDocenteId(docente.id_docente);
                    setEditingDocente({ nombre: docente.nombre, apellido: docente.apellido, especialidad: docente.especialidad });
                  }}>Edit</button>
                  <button className="docentes-button" onClick={() => handleDeleteDocente(docente.id_docente)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Docentes;
const db = require('../db');
const oracledb = require('oracledb');

class Docente {
  constructor(id_docente, nombre, apellido, especialidad) {
    this.id_docente = id_docente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.especialidad = especialidad;
  }

  static async getAll() {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT id_docente, nombre, apellido, especialidad FROM docentes`
      );

      const docentes = result.rows.map(row => {
        return new Docente(row[0], row[1], row[2], row[3]);
      });

      return docentes;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  static async getById(id) {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT id_docente, nombre, apellido, especialidad FROM docentes WHERE id_docente = :id`,
        { id }
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Docente(row[0], row[1], row[2], row[3]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  static async create(docente) {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO docentes (nombre, apellido, especialidad) VALUES (:nombre, :apellido, :especialidad) RETURNING id_docente INTO :id_docente`,
        {
          nombre: docente.nombre,
          apellido: docente.apellido,
          especialidad: docente.especialidad,
          id_docente: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        },
        { autoCommit: true }
      );

      docente.id_docente = result.outBinds.id_docente[0];
      return docente;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  static async update(id, docente) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `UPDATE docentes SET nombre = :nombre, apellido = :apellido, especialidad = :especialidad WHERE id_docente = :id`,
        {
          nombre: docente.nombre,
          apellido: docente.apellido,
          especialidad: docente.especialidad,
          id: id
        },
        { autoCommit: true }
      );

      return { id_docente: id, ...docente };
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  static async delete(id) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `DELETE FROM docentes WHERE id_docente = :id`,
        { id },
        { autoCommit: true }
      );
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

module.exports = Docente;
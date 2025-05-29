const db = require('../db');
const oracledb = require('oracledb');

class Asignatura {
  constructor(id_asignatura, nombre, docente_id) {
    this.id_asignatura = id_asignatura;
    this.nombre = nombre;
    this.docente_id = docente_id;
  }

  static async getAll() {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT id_asignatura, nombre, docente_id FROM asignaturas`
      );

      const asignaturas = result.rows.map(row => {
        return new Asignatura(row[0], row[1], row[2]);
      });

      return asignaturas;
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
        `SELECT id_asignatura, nombre, docente_id FROM asignaturas WHERE id_asignatura = :id`,
        { id }
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Asignatura(row[0], row[1], row[2]);
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

  static async create(asignatura) {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO asignaturas (nombre, docente_id) VALUES (:nombre, :docente_id) RETURNING id_asignatura INTO :id_asignatura`,
        {
          nombre: asignatura.nombre,
          docente_id: asignatura.docente_id,
          id_asignatura: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        },
        { autoCommit: true }
      );

      asignatura.id_asignatura = result.outBinds.id_asignatura[0];
      return asignatura;
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

  static async update(id, asignatura) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `UPDATE asignaturas SET nombre = :nombre, docente_id = :docente_id WHERE id_asignatura = :id`,
        {
          nombre: asignatura.nombre,
          docente_id: asignatura.docente_id,
          id: id
        },
        { autoCommit: true }
      );

      return { id_asignatura: id, ...asignatura };
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
        `DELETE FROM asignaturas WHERE id_asignatura = :id`,
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

module.exports = Asignatura;
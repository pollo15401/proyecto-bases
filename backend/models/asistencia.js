const db = require('../db');
const oracledb = require('oracledb');

class Asistencia {
  constructor(id_asistencia, estudiante_id, fecha, estado) {
    this.id_asistencia = id_asistencia;
    this.estudiante_id = estudiante_id;
    this.fecha = fecha;
    this.estado = estado;
  }

  static async getAll() {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT id_asistencia, estudiante_id, fecha, estado FROM asistencias`
      );

      const asistencias = result.rows.map(row => {
        return new Asistencia(row[0], row[1], row[2], row[3]);
      });

      return asistencias;
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
        `SELECT id_asistencia, estudiante_id, fecha, estado FROM asistencias WHERE id_asistencia = :id`,
        { id }
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Asistencia(row[0], row[1], row[2], row[3]);
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

  static async create(asistencia) {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO asistencias (estudiante_id, fecha, estado) VALUES (:estudiante_id, :fecha, :estado) RETURNING id_asistencia INTO :id_asistencia`,
        {
          estudiante_id: asistencia.estudiante_id,
          fecha: asistencia.fecha,
          estado: asistencia.estado,
          id_asistencia: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        },
        { autoCommit: true }
      );

      asistencia.id_asistencia = result.outBinds.id_asistencia[0];
      return asistencia;
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

  static async update(id, asistencia) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `UPDATE asistencias SET estudiante_id = :estudiante_id, fecha = :fecha, estado = :estado WHERE id_asistencia = :id`,
        {
          estudiante_id: asistencia.estudiante_id,
          fecha: asistencia.fecha,
          estado: asistencia.estado,
          id: id
        },
        { autoCommit: true }
      );

      return { id_asistencia: id, ...asistencia };
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
        `DELETE FROM asistencias WHERE id_asistencia = :id`,
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

module.exports = Asistencia;
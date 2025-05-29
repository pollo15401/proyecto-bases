const db = require('../db');
const oracledb = require('oracledb');

class Evaluacion {
  constructor(id_evaluacion, estudiante_id, asignatura_id, calificacion, fecha) {
    this.id_evaluacion = id_evaluacion;
    this.estudiante_id = estudiante_id;
    this.asignatura_id = asignatura_id;
    this.calificacion = calificacion;
    this.fecha = fecha;
  }

  static async getAll() {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT id_evaluacion, estudiante_id, asignatura_id, calificacion, fecha FROM evaluaciones`
      );

      const evaluaciones = result.rows.map(row => {
        return new Evaluacion(row[0], row[1], row[2], row[3], row[4]);
      });

      return evaluaciones;
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
        `SELECT id_evaluacion, estudiante_id, asignatura_id, calificacion, fecha FROM evaluaciones WHERE id_evaluacion = :id`,
        { id }
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Evaluacion(row[0], row[1], row[2], row[3], row[4]);
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

  static async create(evaluacion) {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO evaluaciones (estudiante_id, asignatura_id, calificacion, fecha) VALUES (:estudiante_id, :asignatura_id, :calificacion, :fecha) RETURNING id_evaluacion INTO :id_evaluacion`,
        {
          estudiante_id: evaluacion.estudiante_id,
          asignatura_id: evaluacion.asignatura_id,
          calificacion: evaluacion.calificacion,
          fecha: evaluacion.fecha,
          id_evaluacion: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        },
        { autoCommit: true }
      );

      evaluacion.id_evaluacion = result.outBinds.id_evaluacion[0];
      return evaluacion;
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

  static async update(id, evaluacion) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `UPDATE evaluaciones SET estudiante_id = :estudiante_id, asignatura_id = :asignatura_id, calificacion = :calificacion, fecha = :fecha WHERE id_evaluacion = :id`,
        {
          estudiante_id: evaluacion.estudiante_id,
          asignatura_id: evaluacion.asignatura_id,
          calificacion: evaluacion.calificacion,
          fecha: evaluacion.fecha,
          id: id
        },
        { autoCommit: true }
      );

      return { id_evaluacion: id, ...evaluacion };
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
        `DELETE FROM evaluaciones WHERE id_evaluacion = :id`,
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

module.exports = Evaluacion;
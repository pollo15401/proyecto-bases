const db = require('../db');
const oracledb = require('oracledb');

class Estudiante {
  constructor(id_estudiante, nombre, apellido, fecha_nacimiento, grupo_id) {
    this.id_estudiante = id_estudiante;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_nacimiento = fecha_nacimiento;
    this.grupo_id = grupo_id;
  }

  static async getAll() {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT id_estudiante, nombre, apellido, fecha_nacimiento, grupo_id FROM estudiantes`
      );

      const estudiantes = result.rows.map(row => {
        return new Estudiante(row[0], row[1], row[2], row[3], row[4]);
      });

      return estudiantes;
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
        `SELECT id_estudiante, nombre, apellido, fecha_nacimiento, grupo_id FROM estudiantes WHERE id_estudiante = :id`,
        { id }
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Estudiante(row[0], row[1], row[2], row[3], row[4]);
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

  static async create(estudiante) {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO estudiantes (nombre, apellido, fecha_nacimiento, grupo_id) VALUES (:nombre, :apellido, :fecha_nacimiento, :grupo_id) RETURNING id_estudiante INTO :id_estudiante`,
        {
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          fecha_nacimiento: estudiante.fecha_nacimiento,
          grupo_id: estudiante.grupo_id,
          id_estudiante: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        },
        { autoCommit: true }
      );

      estudiante.id_estudiante = result.outBinds.id_estudiante[0];
      return estudiante;
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

  static async update(id, estudiante) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `UPDATE estudiantes SET nombre = :nombre, apellido = :apellido, fecha_nacimiento = :fecha_nacimiento, grupo_id = :grupo_id WHERE id_estudiante = :id`,
        {
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          fecha_nacimiento: estudiante.fecha_nacimiento,
          grupo_id: estudiante.grupo_id,
          id: id
        },
        { autoCommit: true }
      );

      return { id_estudiante: id, ...estudiante };
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
        `DELETE FROM estudiantes WHERE id_estudiante = :id`,
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

module.exports = Estudiante;
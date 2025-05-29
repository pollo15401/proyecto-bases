const db = require('../db');
const oracledb = require('oracledb');

class Grupo {
  constructor(id_grupo, nombre_grupo, grado, ciclo_escolar) {
    this.id_grupo = id_grupo;
    this.nombre_grupo = nombre_grupo;
    this.grado = grado;
    this.ciclo_escolar = ciclo_escolar;
  }

  static async getAll() {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT id_grupo, nombre_grupo, grado, ciclo_escolar FROM grupos`
      );

      const grupos = result.rows.map(row => {
        return new Grupo(row[0], row[1], row[2], row[3]);
      });

      return grupos;
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
        `SELECT id_grupo, nombre_grupo, grado, ciclo_escolar FROM grupos WHERE id_grupo = :id`,
        { id }
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Grupo(row[0], row[1], row[2], row[3]);
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

  static async create(grupo) {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO grupos (nombre_grupo, grado, ciclo_escolar) VALUES (:nombre_grupo, :grado, :ciclo_escolar) RETURNING id_grupo INTO :id_grupo`,
        {
          nombre_grupo: grupo.nombre_grupo,
          grado: grupo.grado,
          ciclo_escolar: grupo.ciclo_escolar,
          id_grupo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        },
        { autoCommit: true }
      );

      grupo.id_grupo = result.outBinds.id_grupo[0];
      return grupo;
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

  static async update(id, grupo) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `UPDATE grupos SET nombre_grupo = :nombre_grupo, grado = :grado, ciclo_escolar = :ciclo_escolar WHERE id_grupo = :id`,
        {
          nombre_grupo: grupo.nombre_grupo,
          grado: grupo.grado,
          ciclo_escolar: grupo.ciclo_escolar,
          id: id
        },
        { autoCommit: true }
      );

      return { id_grupo: id, ...grupo };
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
        `DELETE FROM grupos WHERE id_grupo = :id`,
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

module.exports = Grupo;
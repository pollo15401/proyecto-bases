const oracledb = require('oracledb');

const dbConfig = {
  user: 'system',
  password: 'pollo',
  connectString: 'localhost:1521/XEPDB1', // e.g., 'localhost/ORCL'
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connection pool started');
  } catch (err) {
    console.error('Error initializing connection pool:', err);
  }
}

async function closePool() {
  try {
    await oracledb.closePool();
    console.log('Connection pool closed');
  } catch (err) {
    console.error('Error closing connection pool:', err);
  }
}

async function getConnection() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        return connection;
    } catch (err) {
        console.error('Error getting connection:', err);
        throw err;
    }
}

module.exports = {
  initialize,
  closePool,
  getConnection
};
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testConnection() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
  
    });

    const [results] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log('Query Results: ', results);
  } catch (error) {
    console.error('Error connecting to the database: ', error.message);
  } finally {
    if (connection && connection.end) await connection.end();
  }
}

testConnection();

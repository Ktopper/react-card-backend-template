import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function handler(event, context) {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.PLANETSCALE_HOST,
      user: process.env.PLANETSCALE_USERNAME,
      password: process.env.PLANETSCALE_PASSWORD,
      database: process.env.PLANETSCALE_DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const [results] = await connection.execute('SELECT * FROM Events');
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
      console.error(error); // Log the error to console
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
  } finally {
    if (connection && connection.end) await connection.end();
  }
}

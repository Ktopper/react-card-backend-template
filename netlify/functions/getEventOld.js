// getEvents.js
import { connectToDatabase } from './db';

export async function handler(event, context) {
  let connection;

  try {
    connection = await connectToDatabase();

    const [results] = await connection.execute('SELECT * FROM Events');
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    // ... (your error handling here)
  } finally {
    if (connection && connection.end) await connection.end();
  }
}

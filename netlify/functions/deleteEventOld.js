// deleteEvent.js
import { connectToDatabase } from './db';

export async function handler(event, context) {
  let connection;
  const eventId = event.pathParameters.id;

  try {
    connection = await connectToDatabase();

    const query = 'DELETE FROM Events WHERE id = ?';
    await connection.execute(query, [eventId]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event deleted successfully" }),
    };
  } catch (error) {
    // ... (your error handling here)
  } finally {
    if (connection && connection.end) await connection.end();
  }
}

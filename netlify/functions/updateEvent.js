// updateEvent.js
import { connectToDatabase } from './db';

export async function handler(event, context) {
  let connection;
  const eventId = event.pathParameters.id;
  const eventData = JSON.parse(event.body);

  try {
    connection = await connectToDatabase();

    const query = 'UPDATE Events SET ? WHERE id = ?';
    await connection.execute(query, [eventData, eventId]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event updated successfully" }),
    };
  } catch (error) {
    // ... (your error handling here)
  } finally {
    if (connection && connection.end) await connection.end();
  }
}

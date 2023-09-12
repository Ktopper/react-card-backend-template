// updateEvent.js
import { connectToDatabase } from './db';

export async function handler(event, context) {
  let connection;
  try {
    const eventId = event.pathParameters.id;
    const eventData = JSON.parse(event.body);

    console.log("Event ID:", eventId);
    console.log("Event Data:", eventData);

    connection = await connectToDatabase();

    const query = 'UPDATE Events SET ? WHERE id = ?';
    await connection.execute(query, [eventData, eventId]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event updated successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (connection && connection.end) await connection.end();
  }
}

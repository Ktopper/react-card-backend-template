// createEvent.js
import { connectToDatabase } from './db';

export async function handler(event, context) {
  let connection;
  const eventData = JSON.parse(event.body);

  try {
    connection = await connectToDatabase();

    const query = 'INSERT INTO Events SET ?';
    await connection.execute(query, [eventData]);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Event created successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (connection && connection.end) await connection.end();
  }
}

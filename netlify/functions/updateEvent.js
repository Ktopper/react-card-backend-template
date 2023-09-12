import { connectToDatabase } from './db';
import { validateEventData } from './validationUtils';

export async function handler(event, context) {
  let connection;
  const eventId = event.pathParameters.id;
  const eventData = JSON.parse(event.body);
  console.log("Received eventData:", eventData);  // Logging the eventData to console
  const validationError = validateEventData(eventData);
  if (validationError) {
    console.error(validationError);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: validationError }),
    };
  }

  try {
    connection = await connectToDatabase();

    const query = 'UPDATE Events SET ? WHERE id = ?';
    await connection.execute(query, [eventData, eventId]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event updated successfully" }),
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

import { connectToDatabase } from './db';
import { validateEventData } from './validationUtils';

export async function handler(event, context) {
  let connection;
  const eventData = JSON.parse(event.body);

  console.log("Event body:", event.body); // Logging the raw event body
  console.log("Parsed event data:", eventData); 
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

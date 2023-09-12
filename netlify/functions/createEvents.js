import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  try {
    const createdEvent = await prisma.event.create({ data });
    return { statusCode: 201, body: JSON.stringify(createdEvent) };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};

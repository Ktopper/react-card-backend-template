import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const { id, ...updates } = data;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updates,
    });
    return { statusCode: 200, body: JSON.stringify(updatedEvent) };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};

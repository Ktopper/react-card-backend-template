import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { id } = JSON.parse(event.body);

  try {
    await prisma.event.delete({ where: { id } });
    return { statusCode: 200, body: 'Event Deleted' };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};

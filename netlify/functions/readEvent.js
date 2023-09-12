import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const events = await prisma.event.findMany();
    return { statusCode: 200, body: JSON.stringify(events) };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};

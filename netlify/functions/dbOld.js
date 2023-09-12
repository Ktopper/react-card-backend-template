// db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToDatabase() {
  return await mysql.createConnection({
    host: process.env.PLANETSCALE_HOST,
    user: process.env.PLANETSCALE_USERNAME,
    password: process.env.PLANETSCALE_PASSWORD,
    database: process.env.PLANETSCALE_DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

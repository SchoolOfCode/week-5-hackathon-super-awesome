import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS games CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);

    // Create the users table
    await pool.query(`
      CREATE TABLE users (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `);

    // Create the games table with a foreign key to the users table
    await pool.query(`
      CREATE TABLE games (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        date_played DATE,
        winning_player INT REFERENCES users(id),
        losing_player INT REFERENCES users(id)
      );
    `);

    // Seed the users table
    await pool.query(`
      INSERT INTO users (user_name, email)
      VALUES 
        ('Adam', 'ajhemmings@live.co.uk'),
        ('Suede', 'liz@lizwade.com'),
        ('Joe', 'jow@msn.com');
    `);

    // Seed the games table
    await pool.query(`
      INSERT INTO games (date_played, winning_player, losing_player)
      VALUES 
        ('2025-01-01', 1, 2),
        ('2025-08-17', 3, 1),
        ('2024-12-31', 1, 3),
        ('2024-12-26', 3, 2),
        ('2024-12-24', 3, 2);     
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();

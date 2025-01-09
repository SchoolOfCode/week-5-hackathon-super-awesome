// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA
// THIS IS COPY PASTE AND NEEDS TO BE POPULATED WITH OUT DATA



import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS games CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);

    // Create the authors table
    await pool.query(`
      CREATE TABLE users (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
      );
    `);

    // Create the books table with a foreign key to the authors table
    await pool.query(`
      CREATE TABLE games (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        date_played DATE,
        winning_player int,
        losing_player int
      );
    `);

    // Seed the authors table
    await pool.query(`
      INSERT INTO users (user_name, email)
      VALUES 
        ('Adam', 'ajhemmings@live.co.uk'),
        ('Suede', 'liz@lizwade.com'),
        ('Joe', 'jow@msn.com'),
    `);

    // Seed the books table
    await pool.query(`
      INSERT INTO games (date_played, winning_player, losing_player)
      VALUES 
        ('2025-01-01', 1, 2),
        ('2025-08-17'),
        ('Harry Potter and the Philosopher''s Stone', '1997-06-26', 2),
        ('Harry Potter and the Chamber of Secrets', '1998-07-02', 2),
        ('The Hobbit', '1937-09-21', 3),
        ('The Lord of the Rings: The Fellowship of the Ring', '1954-07-29', 3),
        ('The Lord of the Rings: The Two Towers', '1954-11-11', 3),
        ('The Lord of the Rings: The Return of the King', '1955-10-20', 3),
        ('And Then There Were None', '1939-11-06', 4),
        ('Murder on the Orient Express', '1934-01-01', 4);
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

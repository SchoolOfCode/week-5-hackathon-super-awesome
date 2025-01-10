import { pool } from "../db/index.js";

export async function fetchAllGames() {
  const result = await pool.query("SELECT * FROM games;");
  return result.rows;
}

export async function fetchGameById(id) {
  const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
  return result.rows[0];
}

export async function insertGame(date_played, winning_player, losing_player) {
  const result = await pool.query(
    "INSERT INTO games (date_played, winning_player, losing_player) VALUES ($1, $2, $3) RETURNING *;",
    [date_played, winning_player, losing_player]
  );
  return result.rows[0];
}

//TODO: write modifyGameById after we've improved the one in models/users
export async function modifyGameById(id) {}

export async function removeGameById(id) {
  const result = await pool.query(
    "DELETE FROM games WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null;
}

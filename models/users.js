import { getUsers } from "../controllers/users.js";
import { pool } from "../db/index.js";

export async function fetchAllUsers() {
  const result = await pool.query("SELECT * FROM users;");
  return result.rows;
}

export async function fetchUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
  return result.rows[0];
}

export async function insertUser(user_name, email) {
  const result = await pool.query(
    "INSERT INTO users (user_name, email) VALUES ($1, $2) RETURNING *;",
    [user_name, email]
  );
  return result.rows[0];
}

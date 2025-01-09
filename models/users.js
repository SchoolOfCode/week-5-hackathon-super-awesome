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

export async function modifyUserById(id, user_name, email) {
  const result = await pool.query(
    "UPDATE users SET user_name = $1, email = $2 WHERE id = $3 RETURNING *",
    [user_name, email, id]
  );
  return result.rows[0] || null;
}

export async function removeUserById(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null;
}

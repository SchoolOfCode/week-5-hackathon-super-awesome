import {
  // the SQL-handling functions in MODELS
  fetchAllUsers,
  fetchUserById,
  insertUser,
  modifyUserById,
  removeUserById,
} from "../models/users.js";

export async function getUsers(req, res) {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await fetchUserById(parseInt(req.params.id));
    if (user) {
      res.status(200).json({ status: "success", data: user });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createUser(req, res) {
  try {
    const { user_name, email } = req.body;
    if (!user_name || !email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const user = await insertUser(user_name, email);
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

//TODO: Make this work for only a partial patch?
export async function updateUserById(req, res) {
  try {
    const id = req.params.id;
    const { user_name, email } = req.body;
    if (!user_name || !email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" }); // shouldn't we be able to patch just one field?
    }
    const user = await modifyUserById(id, user_name, email);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

// this is currently failing as the attempted deletion "VIOLATES FOREIGN KEY CONSTRAINTS"
// Was this a problem with books and authors? How was it solved?
//TODO: fix violation issue

export async function deleteUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await removeUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

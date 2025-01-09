import {
  // functions that will exist in MODELS
  fetchAllUsers,
  insertUser,
} from "../models/users.js";

export async function getUsers(req, res) {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getUsersById(req, res) {
  try {
    const users = await fetchAllUsers();
    const user = users.find((user) => user.id === parseInt(req.params.id));
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

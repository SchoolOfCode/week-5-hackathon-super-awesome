import express from "express";
import {
  getUsers,
  getUsersById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/", createUser);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);
// score?
export default router;

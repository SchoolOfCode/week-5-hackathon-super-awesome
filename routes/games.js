import express from "express";
import {
  getGames,
  getGameById,
  createGame,
  updateGameById,
  deleteGameById,
} from "../controllers/games.js";
import { create } from "domain"; // what's this one and why is it here but not in the users equiv?

const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGameById);
router.post("/", createGame);
// router.patch("/:id", updateGameById);
router.delete("/:id", deleteGameById);

export default router;

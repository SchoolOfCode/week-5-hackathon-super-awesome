import express from "express";
import {
    getGames,
    getGamesById,
    createGame,
    updateGameById,
    deleteGameById,
} from "../controllers/games.js";
import { create } from "domain";

const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGamesById);
router.post("/", createGame);
router.patch("/:id", updateGameById);
router.delete("/:id", deleteGameById);

export default router;
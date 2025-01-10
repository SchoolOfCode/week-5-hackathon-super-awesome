import {
  //the SQL-handling functions in MODELS
  fetchAllGames,
  fetchGameById,
  insertGame,
  modifyGameById,
  removeGameById,
} from "../models/games.js";

export async function getGames(req, res) {
  try {
    const games = await fetchAllGames();
    res.status(200).json({ status: "success", data: games });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getGameById(req, res) {
  try {
    const game = await fetchGameById(parseInt(req.params.id));
    if (!game) {
      res.status(404).json({ status: "error", message: "Game not found" });
    }
    res.status(200).json({ status: "success", data: game });
  } catch {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createGame(req, res) {
  try {
    const { date_played, winning_player, losing_player } = req.body;
    if (!date_played || !winning_player || !losing_player) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const game = await insertGame(date_played, winning_player, losing_player);
    res.status(200).json({ status: "success", data: game });
  } catch {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function updateGameById(req, res) {
  //TODO:
}

// currently throwing errors. Should these res statements have "return"?
export async function deleteGameById(req, res) {
  try {
    const id = req.params.id;
    const game = await removeGameById(id);
    if (!game) {
      return res
        .status(404)
        .json({ status: "fail", message: "Game not found" });
    }
    res.status(200).json({ status: "success", data: game }); 
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

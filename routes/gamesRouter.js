import { Router } from "express";
import { getAllGames, getGamesByGenre } from "../controllers/getGames.js";
import { deleteGameByTitle } from "../controllers/deleteGames.js";

const gamesRouter = new Router;

gamesRouter.get("/all", getAllGames);
gamesRouter.get("/:genre", getGamesByGenre);
gamesRouter.get("/:genre/delete/:title", deleteGameByTitle);

export default gamesRouter;
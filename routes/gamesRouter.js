import { Router } from "express";
import { getAllGames, getGamesByGenre } from "../controllers/getGames.js";
import { deleteAllGames, deleteGameByTitle, deleteGamesByGenre } from "../controllers/deleteGames.js";

const gamesRouter = new Router;

gamesRouter.get("/all", getAllGames);
gamesRouter.get("/all/delete", deleteAllGames);
gamesRouter.get("/:genre", getGamesByGenre);
gamesRouter.get("/:genre/delete", deleteGamesByGenre);
gamesRouter.get("/:genre/delete/:title", deleteGameByTitle);

export default gamesRouter;
import { Router } from "express";
import { getAllGames, getGamesByGenre } from "../controllers/getGames.js";

const gamesRouter = new Router;

gamesRouter.get("/all", getAllGames);
gamesRouter.get("/:genre", getGamesByGenre);

export default gamesRouter;
import { Router } from "express";
import { getAllGames } from "../controllers/getGames.js";

const gamesRouter = new Router;

gamesRouter.get("/all", getAllGames);

export default gamesRouter;
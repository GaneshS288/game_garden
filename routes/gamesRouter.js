import express, { Router } from "express";
import { getAllGames, getGamesByGenre } from "../controllers/getGames.js";
import {
  deleteAllGames,
  deleteGameByTitle,
  deleteGamesByGenre,
} from "../controllers/deleteGames.js";
import { addGame, renderAddGameForm } from "../controllers/addGames.js";
import { editGame, renderEditGameForm } from "../controllers/editGames.js";
import { body } from "express-validator";

const gamesRouter = new Router();

gamesRouter.use(express.urlencoded({ extended: true }));

gamesRouter.get("/new", renderAddGameForm);
gamesRouter.get("/all", getAllGames);
gamesRouter.get("/all/delete", deleteAllGames);
gamesRouter.get("/:genre", getGamesByGenre);
gamesRouter.get("/edit/:title", renderEditGameForm);
//get routes below here are used for deleting games
gamesRouter.get("/:genre/delete", deleteGamesByGenre);
gamesRouter.get("/:genre/delete/:title", deleteGameByTitle);

gamesRouter.post(
  "/new",
  body(["title", "developer", "publisher", "genre"])
    .trim()
    .notEmpty()
    .escape()
    .withMessage("this field can't be empty!"),
  addGame
);

gamesRouter.post("/edit/:title", body(["newTitle", "oldTitle", "newDeveloper", "newPublisher", "newGenre"])
.trim()
.notEmpty()
.escape()
.withMessage("this field can't be empty!"), editGame )

export default gamesRouter;

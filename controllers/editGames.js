import DB from "../db/queries.js";
import asyncHandler from "../lib/asyncHandler.js";
import { validationResult } from "express-validator";

const renderEditGameForm = asyncHandler(async (req, res, next) => {
  const title = req.params.title;
  const game = await DB.getGameByTitle(title);
  const allGenres = await DB.getAllGenres()

  res.status(200).render("editGameForm", { ...game, genres: allGenres });
});

export { renderEditGameForm };

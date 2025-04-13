import DB from "../db/queries.js";
import asyncHandler from "../lib/asyncHandler.js";
import { validationResult } from "express-validator";

const renderAddGameForm = asyncHandler(async (req, res, next) => {
  const genres = await DB.getAllGenres();

  res.status(200).render("newGameForm.ejs", { genres });
});

const addGame = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);

  if(result.isEmpty()) {
    const {title, developer, publisher, genre } = req.body;
    const game = await DB.addGame({title, developer, publisher, genre});
    res.status(201).redirect("/games/all");
  }
  else {
    console.log(result.array());
    res.render( "errorPage", {errCode : 400, errMessage: result.array()[0].message })
  }
})

export { renderAddGameForm, addGame };

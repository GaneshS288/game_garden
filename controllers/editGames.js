import DB from "../db/queries.js";
import asyncHandler from "../lib/asyncHandler.js";
import { validationResult } from "express-validator";

const renderEditGameForm = asyncHandler(async (req, res, next) => {
  const title = req.params.title;
  const game = await DB.getGameByTitle(title);
  const allGenres = await DB.getAllGenres()

  res.status(200).render("editGameForm", { ...game, genres: allGenres });
});

const editGame = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);
  
  if (result.isEmpty()) {
    const { oldTitle, newTitle, newDeveloper, newPublisher, newGenre } = req.body;
    const editedGame = await DB.editGame({oldTitle, newTitle, newDeveloper, newPublisher, newGenre});

    if (editedGame === null)
      res.send("No game with this title was found");
    else if(editedGame === "This game already exists")
      res.render("errorPage", {errCode : 400, errMessage: "This game already exists"});
    else
      res.redirect("/games/all");
  }
  else {
    console.log(result.array());
    res.render( "errorPage", {errCode : 400, errMessage: result.array()[0].message });
  }
})

export { renderEditGameForm, editGame };

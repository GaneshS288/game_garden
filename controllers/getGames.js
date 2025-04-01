import DB from "../db/queries.js";
import asyncHandler from "../lib/asyncHandler.js";

const getAllGames = asyncHandler(async (req, res, next) => {
  const allGames = await DB.getAllGames();
  const allGenres = await DB.getAllGenres();

  res
    .status(200)
    .render("gamesTable", {
      games: allGames,
      genres: ["all", ...allGenres],
      selectedGenre: "all",
    });
});

export { getAllGames };

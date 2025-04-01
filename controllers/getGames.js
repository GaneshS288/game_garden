import DB from "../db/queries.js";
import asyncHandler from "../lib/asyncHandler.js";

const getAllGames = asyncHandler(async (req, res, next) => {
  const allGames = await DB.getAllGames();
  const allGenres = await DB.getAllGenres();

  res
    .status(200)
    .render("gamesTable", {
      games: allGames,
      genres: ["All", ...allGenres],
      selectedGenre: "All",
    });
});

const getGamesByGenre = asyncHandler(async (req, res, next) => {
    const selectedGenre = req.params.genre;
    const games = await DB.getGamesByGenre(selectedGenre);
    const allGenres = await DB.getAllGenres();
    

    res
    .status(200)
    .render("gamesTable", {
      games: games,
      genres: ["All", ...allGenres],
      selectedGenre: selectedGenre,
    });
})

export { getAllGames, getGamesByGenre };

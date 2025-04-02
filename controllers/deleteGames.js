import DB from "../db/queries.js";
import asyncHandler from "../lib/asyncHandler.js";

const deleteAllGames = asyncHandler(async (req, res, next) => {
    const title = req.params.title;
    res.send(title);
})

const deleteGameByTitle = asyncHandler(async (req, res, next) => {
    const title = req.params.title;
    const deletedGame = await DB.deleteGameByTitle(title);
    if(deletedGame === null)
        res.status(404).send("This resource does not exist");
    else
        res.status(204).redirect("/games/all");
})

export { deleteGameByTitle };
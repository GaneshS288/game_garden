/*
Routes-
/ - this will be the homepage that contains a link to /games/all
/games/:genre - this will show games depending on genre unless genre is 'all' then we show all games
/games/new - show a form to add a new game that redirects on submit to /games/all
/games/edit/:gameTitle - edit a game and then redirect to /games/all
*/

import { Router } from "express";

const indexRouter = new Router();

indexRouter.get("/", (req, res) => {
    res.status(200).send("welcome");
})

export default indexRouter;
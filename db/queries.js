import pool from "./pool.js";

class DB {
  static async getAllGames() {
    const { rows: games } = await pool.query(
      `SELECT title, developer, publisher, genres.genre FROM games
       JOIN genres ON games.genre_id = genres.id;`
    );

    return games;
  }

  static async getAllGenres() {
    const { rows: genres } = await pool.query(`SELECT genre FROM genres;`);
    return genres;
  }

  static async getGameByTitle(title) {
    const { rows: game } = await pool.query(
      `SELECT title, developer, publisher, genres.genre FROM games
       JOIN genres ON games.genre_id = genres.id 
       WHERE LOWER(title) = $1;`,
      [title.toLowerCase()]
    );

    return game[0];
  }
}

console.log(await DB.getAllGames());
console.log(await DB.getAllGenres());
console.log(await DB.getGameByTitle("DeAD SpacE"));

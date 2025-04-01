import pool from "./pool.js";

class DB {
  static async getAllGames() {
    const { rows: games } = await pool.query(
      `SELECT title, developer, publisher, genres.genre FROM games
       JOIN genres ON games.genre_id = genres.id;`
    );

    return games;
  }

  static async getGameByTitle(title) {
    const { rows: game } = await pool.query(
      `SELECT games.id, title, developer, publisher, genres.genre FROM games
       JOIN genres ON games.genre_id = genres.id 
       WHERE LOWER(title) = $1;`,
      [title.toLowerCase()]
    );

    if (game.length !== 0) return game[0];
    else if (game.length === 0) return null;
  }

  static async addGame({ title, developer, publisher, genre }) {
    const gameAlreadyInDatabase = await this.getGameByTitle(title);
    const genreId = await this.getGenreIdByName(genre);

    if (gameAlreadyInDatabase !== null || genreId === null) return null;
    else if (gameAlreadyInDatabase === null && genreId) {
      const { rows: game } = await pool.query(
        `INSERT INTO games (title, developer, publisher, genre_id) 
        VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [title, developer, publisher, genreId]
      );

      return game;
    }
  }

  static async editGame({
    oldTitle,
    newTitle,
    newDeveloper,
    newPublisher,
    newGenre,
  }) {
    const oldGame = await this.getGameByTitle(oldTitle);
    const alreadyExistingNewGame = await this.getGameByTitle(newTitle);
    const newGenreId = await this.getGenreIdByName(newGenre);

    if (oldGame === null || newGenreId === null) return null;
    else if (
      alreadyExistingNewGame !== null &&
      alreadyExistingNewGame?.id !== oldGame.id
    )
      return "This game already exists";
    else {
      const { rows: newGame } = await pool.query(
        `UPDATE games SET title = $1, developer = $2, publisher = $3, genre_id = $4
        WHERE LOWER(title) = $5
        RETURNING *;`,
        [
          newTitle,
          newDeveloper,
          newPublisher,
          newGenreId,
          oldTitle.toLowerCase(),
        ]
      );

      return newGame[0];
    }
  }

  static async deleteAllGames() {
    const { rows: result } = await pool.query(`DELETE FROM games RETURNING *;`);
    if (result.length === 0) return null;
    else return result;
  }

  static async deleteGameByTitle(title) {
    const { rows: deletedGame } = await pool.query(
      `DELETE FROM games
       WHERE LOWER(title) = $1 
       RETURNING *`,
      [title]
    );

    if (deletedGame.length === 0) return null;
    else return deletedGame;
  }

  static async deleteGameByGenre(genre) {
    const { rows: deletedGames } = await pool.query(
      `DELETE FROM games
       USING genres
       WHERE games.genre_id = genres.id AND LOWER(genres.genre) = $1
       RETURNING games.id, games.title, games.developer, games.publisher, games.genre_id, genres.genre;`,
      [genre.toLowerCase()]
    );

    if (deletedGames.length === 0) return null;
    else return deletedGames;
  }

  static async getAllGenres() {
    const { rows: genres } = await pool.query({
      text: `SELECT genre FROM genres;`,
      rowMode: "array",
    });
    return genres;
  }

  static async getGenreIdByName(genre) {
    const { rows: genreId } = await pool.query(
      `SELECT id FROM genres
       WHERE LOWER(genre) = $1`,
      [genre.toLowerCase()]
    );

    if (genreId.length !== 0) return genreId[0].id;
    else return null;
  }
}

export default DB;

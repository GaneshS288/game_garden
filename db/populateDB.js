import "dotenv/config";
import process from "node:process";
import pg from "pg";

const { Client } = pg;
const connectionString = process.argv[2];

const gameData = [
  {
    title: "Dead Space",
    developer: "EA Redwood Shores",
    publisher: "EA",
    genre: "Horror",
  },
  {
    title: "Grand Theft Auto 5",
    developer: "Rockstar North",
    publisher: "Rockstar Games",
    genre: "Open World",
  },
  {
    title: "The Witcher 3",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    genre: "Open World"
  },
  {
    title: "Nine Sols",
    developer: "Red Candle Games",
    publisher: "Red Candle Games",
    genre: "Metroidvania"
  },
  {
    title: "Castlevania Symphony of The Night",
    developer: "Konami Tokyo",
    publisher: "Konami",
    genre: "Metroidvania"
  },
  {
    title: "Alien Isolation",
    developer: "Creative Assembley",
    publisher: "Sega",
    genre: "Horror"
  },
  {
    title: "Hollow Knight",
    developer: "Team Cherry",
    publisher: "Team Cherry",
    genre: "Metroidvania"
  },
  {
    title: "UltraKill",
    developer: "Aris 'Hakita' Patala",
    publisher: "New Blood Interactive",
    genre: "Shooter"
  }
];

const genres = ["Open World", "Horror", "Shooter", "Metroidvania"];

const TABLESQL = `
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT UNIQUE NOT NULL,
    developer TEXT NOT NULL,
    publisher TEXT NOT NULL,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE
);
`;

async function populateDB() {
  if (connectionString) {
    try {
      const client = new Client(connectionString);
      await client.connect();
      await client.query(TABLESQL);

      for(const genre of genres) {
        await client.query(`INSERT INTO genres (genre) VALUES($1)`, [genre]);
      }

      for (const data of gameData) {
        const { rows: genreId } = await client.query(
          `SELECT id FROM genres WHERE genre = $1`,
          [data.genre]
        );

        await client.query(
          `INSERT INTO games (title, developer, publisher, genre_id) VALUES ($1, $2, $3, $4)`,
          [data.title, data.developer, data.publisher, genreId[0].id]
        );
      }
      await client.end();
    } catch (err) {
      console.log(err);
    }
  }
}

await populateDB();

const client = new Client(connectionString);
await client.connect();
const { rows } = await client.query(
  `SELECT title, developer, publisher, genre FROM games JOIN genres ON genre_id = genres.id`
);
await client.end();

console.log(rows);

import "dotenv/config";
import express from "express";
import path from "path";

const app = express();
const assetsPath = path.join(import.meta.dirname, "public");

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.listen(8080, () => console.log("app listening at port 8080"));

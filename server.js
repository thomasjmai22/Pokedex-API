const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
// const PORT = 8000;
const PORT = process.env.PORT || 8000;
const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`,
];
const POKEDEX = require("./pokedex.json");

//Everything gets routed through morgan (middleware)
// process.env.NODE_ENV = "production"
const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "dev";
app.use(morgan("morganSetting"));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken); //will run on every single route

//ROUTES
app.get("/types", validateBearerToken, handleGetTypes);
app.get("/pokemon", handleGetPokemon);

//FUNCTIONS
function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  // const bearerToken = req.get("Authorization").split(" ")[1]; removed
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.statusCode(404).json({ error: "Unauthorized Request" });
  }
  next();
}

function handleGetTypes(req, res) {
  res.json(validTypes);
}

function handleGetPokemon(req, res) {
  let response = POKEDEX.pokemon;

  if (req.query.name) {
    response = response.filter((pokemon) => {
      return pokemon.name
        .toLocaleLowerCase()
        .includes(req.query.name.toLowerCase());
    });
  }

  res.json(response);
}

app.use(PORT, () => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

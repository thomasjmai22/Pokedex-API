const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = 8000;
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

console.log(POKEDEX.pokemon[0].name);

//Everything gets routed through morgan (middleware)
app.use(morgan("dev"));
app.use(validateBearerToken); //will run on every single route

// app.use((req, res, next) => {
//   // res.send("Hello World");
//   next();
// });

//ROUTES
app.get("/types", validateBearerToken, handleGetTypes);
app.get("/pokemon", handleGetPokemon);

//FUNCTIONS
function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  // const bearerToken = req.get("Authorization").split(" ")[1]; removed bc no api input in postman - cant split undefined
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized Request" });
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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

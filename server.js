const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  // res.send("Hello World");
  next();
});

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

//ROUTES
app.get("/types", handleGetTypes);

//FUNCTIONS
function handleGetTypes(req, res) {
  res.json(validTypes);
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

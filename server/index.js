// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API TO GET CATCH PROBABILITY

app.get("/api/catch", (req, res) => {
  const prob = () => {
    let random = Math.random();
    return random < 0.5 ? false : true;
  };

  const result = prob();

  res.json({
    message: result
      ? "Congratulation, this pokemon is yours !"
      : "You're failed. Don't worry try again later",

    value: result,
  });
});

// API TO RELEASE MY POKEMON

app.get("/api/release", (req, res) => {
  const random = Math.floor(Math.random() * 101 + 1);

  res.json({
    message: "This is your result number",
    value: random,
  });
});

// API TO RENAME MY POKEMON

app.post("/api/rename", (req, res) => {
  let data = req.body;
  let fibb = data.fibb;
  let name = data.name;

  if (fibb.length === 0) {
    fibb.push(0);
  } else if (fibb.length === 1) {
    fibb.push(1);
  } else {
    fibb.push(fibb[fibb.length - 1] + fibb[fibb.length - 2]);
    console.log(fibb);
  }

  res.json({
    message: "This is your new name",
    data: {
      name: name.split("-")[0] + "-" + fibb[fibb.length - 1],
      fibb: fibb,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

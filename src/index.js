const express = require("express");
const helmet = require("helmet");

const port = 4000;

const app = express();

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

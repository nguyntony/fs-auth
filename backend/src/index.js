const express = require("express");
const helmet = require("helmet");

const port = 4000;

const app = express();

// the following two lines of middleware are required to access data from req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/register", (req, res) => {
  res.send("gimme your info");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  res.json({
    name,
    email,
    password,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const { userController } = require("./db/controllers");

const port = 4000;

const app = express();

// the following two lines of middleware are required to access data from req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// register
app.get("/register", (req, res) => {
  res.send("gimme your info to signup!");
});
app.post("/register", userController.processSignUp);

// login
app.get("/login", (req, res) => {
  res.send("so you wanna login?");
});
app.post("/login", userController.processLogin);

// authenicating?
const posts = [
  {
    username: "testing",
    message: `you're name is testing`,
  },
  {
    username: "not testing",
    message: `you're name is not testing`,
  },
];
app.get("/posts", userController.authenticateToken, (req, res) => {
  res.json(posts.filter((p) => p.username === req.user.name));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

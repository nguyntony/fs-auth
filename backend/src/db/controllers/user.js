const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const processSignUp = async (req, res) => {
  let { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  // before I can create a new user, I must first check if a current user exists with the same email.
  // I can access my db and search for a user, if something is returned then I cannot create.
  // I remember that working with sequelize there is a constraint that I can use to ensure uniqueness, I'm adding that to the migrations file but I have not ran the migrate.

  const findUser = await User.findOne({
    where: {
      email,
    },
  });

  if (!findUser) {
    // if a user is not found, meaning the email does not exist then it will return null, so if I want this if statement to run, I can use !
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });
  } else {
    res.json({
      error: "This email is already in use.",
    });
  }

  res.json({
    name,
    email,
    hash,
  });
};

const processLogin = async (req, res) => {
  let { email, password } = req.body;
  const findUser = await User.findOne({
    where: {
      email,
    },
  });
  if (findUser) {
    const passwordCheck = bcrypt.compareSync(password, findUser.password);
    const user = { name: findUser.name, email: findUser.email };

    if (passwordCheck) {
      const accessToken = generateAccessToken(user);
      // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      res.json({
        message: "successful login",
        accessToken,
        refreshToken,
      });
    } else {
      res.json({
        message: "unsuccessful login",
      });
    }
  } else {
    res.json({
      message: "no user found",
    });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = {
  processSignUp,
  processLogin,
  authenticateToken,
  generateAccessToken,
};

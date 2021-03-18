const bcrypt = require("bcryptjs");
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
  const user = await User.findOne({
    where: {
      email,
    },
  });
  // this returns a boolean depending on password match or not.
  const passwordCheck = bcrypt.compareSync(password, user.password);

  if (user && passwordCheck) {
    res.json({
      message: "successful login",
    });
  } else {
    res.json({
      message: "unsuccessful login",
    });
  }
};

module.exports = {
  processSignUp,
  processLogin,
};

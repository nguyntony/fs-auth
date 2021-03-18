const bcrypt = require("bcryptjs");

const processSignUp = async (req, res) => {
  let { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  res.json({
    name,
    email,
    hash,
  });
};

module.exports = {
  processSignUp,
};

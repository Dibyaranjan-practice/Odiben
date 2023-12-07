const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("./../models/UserModel");

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ status: "failed", msg: "invalid credentials" });
  }
  const token = await jwt.sign({ email }, process.env.SECRET_KEY);
  res.status(200).json({ token, status: "success", msg: "Validation success" });
};

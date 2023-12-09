const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("./../models/UserModel");
const UserModel = require("./../models/UserModel");

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ status: "failed", msg: "invalid credentials" });
  }
  const token = await jwt.sign({ email }, process.env.SECRET_KEY);
  res.status(200).json({ token, status: "success", msg: "Validation success" });
};

exports.postSignUp = async (req, res) => {
  const email = req.body.email;
  const user = await findUserByEmail(email);
  if (user)
    return res
      .status(409)
      .json({ status: "failed", msg: "email already exists" });
  req.body.password = await bcrypt.hash(req.body.password, 12);
  UserModel.create(req.body)
    .then(() => {
      return res
        .status(200)
        .json({ status: "success", msg: "user creation success" });
    })
    .catch((error) =>
      res
        .status(500)
        .json({
          status: "failed",
          msg: "Internal error! please try after some time",
        })
    );
};

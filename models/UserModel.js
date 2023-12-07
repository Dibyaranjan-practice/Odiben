const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, primaryKey: true },
  fistname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  address: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  profile_image: { type: DataTypes.STRING },
});
exports.findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ where: { email } });
  return user;
};

module.exports = User;

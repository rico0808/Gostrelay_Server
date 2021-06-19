const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const UserModel = sequelize.define(
  "User",
  {
    id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, comment: "登录邮箱" },
    password: { type: DataTypes.STRING, allowNull: false, comment: "登录密码" },
    slat: { type: DataTypes.STRING, allowNull: false, comment: "密码盐" },
    balance: { type: DataTypes.FLOAT, defaultValue: 0, comment: "余额" },
    is_admin: { type: DataTypes.TINYINT, defaultValue: 0, comment: "管理员" },
  },
  { defaultScope: { attributes: { exclude: ["password", "slat"] } } }
);

module.exports = UserModel;

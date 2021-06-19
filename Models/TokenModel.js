const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const TokenModel = sequelize.define("Token", {
  id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
  email: { type: DataTypes.STRING, allowNull: false, comment: "邮箱" },
  token: { type: DataTypes.STRING, allowNull: false, comment: "Token 值" },
  type: { type: DataTypes.STRING, allowNull: false, comment: "Token 类型" },
});

module.exports = TokenModel;

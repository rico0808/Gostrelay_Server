const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const ServerModel = sequelize.define("Server", {
  id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
  user_id: { type: DataTypes.INTEGER, allowNull: false, comment: "用户ID" },
  name: { type: DataTypes.STRING, allowNull: false, comment: "服务器名字" },
  local: { type: DataTypes.STRING, allowNull: false, comment: "地区" },
  ip_addr: { type: DataTypes.STRING, allowNull: false, comment: "ip地址" },
  status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0离线 1在线" },
});

module.exports = ServerModel;

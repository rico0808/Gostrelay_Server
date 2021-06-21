const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const ServerModel = sequelize.define(
  "Server",
  {
    id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
    user_id: { type: DataTypes.INTEGER, allowNull: false, comment: "用户ID" },
    name: { type: DataTypes.STRING, allowNull: false, comment: "服务器名字" },
    local: { type: DataTypes.STRING, allowNull: false, comment: "地区" },
    ip_addr: { type: DataTypes.STRING, allowNull: false, comment: "ip地址" },
    bandwidth: { type: DataTypes.BIGINT, allowNull: false, comment: "带宽" },
    status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0离线 1在线" },
    token: { type: DataTypes.STRING, allowNull: false, comment: "后端对接 TOKEN" },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["token"],
      },
    },
  }
);

module.exports = ServerModel;

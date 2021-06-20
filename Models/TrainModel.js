const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const TrainModel = sequelize.define("Train", {
  id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
  user_id: { type: DataTypes.INTEGER, allowNull: false, comment: "用户ID" },
  server_id: { type: DataTypes.INTEGER, allowNull: false, comment: "服务器ID" },
  name: { type: DataTypes.STRING, defaultValue: 0, comment: "发车名字" },
  number: { type: DataTypes.INTEGER, defaultValue: 0, comment: "位置数量" },
  price: { type: DataTypes.FLOAT, defaultValue: 0, comment: "车位价格" },
  port: { type: DataTypes.STRING, defaultValue: 0, comment: "端口范围" },
  port_num: { type: DataTypes.INTEGER, defaultValue: 0, comment: "端口数量" },
  traffic: { type: DataTypes.FLOAT, defaultValue: 0, comment: "流量限制" },
});

module.exports = TrainModel;

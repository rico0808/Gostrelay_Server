const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const OrderModel = sequelize.define("Order", {
  id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
  user_id: { type: DataTypes.INTEGER, allowNull: false, comment: "用户ID" },
  train_id: { type: DataTypes.INTEGER, allowNull: false, comment: "车次ID" },
  port_num: { type: DataTypes.INTEGER, allowNull: false, comment: "端口数量" },
  up: { type: DataTypes.BIGINT, defaultValue: 0, comment: "上传流量" },
  down: { type: DataTypes.BIGINT, defaultValue: 0, comment: "下载流量" },
  traffic: { type: DataTypes.BIGINT, allowNull: false, comment: "总流量" },
  expore_time: { type: DataTypes.DATE, allowNull: false, comment: "过期时间" },
  status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "状态 0正常 1过期 2退款" },
});

module.exports = OrderModel;

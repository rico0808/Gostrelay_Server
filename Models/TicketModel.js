const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const TicketModel = sequelize.define("Ticket", {
  id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
  user_id: { type: DataTypes.INTEGER, allowNull: false, comment: "用户ID" },
  subject: { type: DataTypes.STRING, allowNull: false, comment: "工单内容" },
  level: { type: DataTypes.INTEGER, defaultValue: 0, comment: "0一般 1中等 2高级" },
  status: { type: DataTypes.INTEGER, defaultValue: 0, comment: "0开启 1回复 2关闭" },
});

module.exports = TicketModel;

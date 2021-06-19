const { DataTypes } = require("sequelize");
const { sequelize } = require("../app/Utils/sequelize");

const TicketMessageModel = sequelize.define("TicketMessage", {
  id: { autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true, comment: "主键ID" },
  ticket_id: { type: DataTypes.INTEGER, allowNull: false, comment: "父工单ID" },
  message: { type: DataTypes.STRING, allowNull: false, comment: "回复内容" },
  is_admin: { type: DataTypes.INTEGER, defaultValue: 0, comment: "是否为管理回复" },
});

module.exports = TicketMessageModel;

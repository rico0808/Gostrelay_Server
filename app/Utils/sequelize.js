const { Sequelize } = require("sequelize");
const { db } = require("../../Config");

const sequelize = new Sequelize({
  ...db,
  dialect: "mysql",
  pool: {
    min: 0,
    max: 10,
    idle: 10 * 1000,
  },
  logging: false,
  timezone: "+08:00",
});

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync();
    console.log("连接数据库成功");
  })
  .catch(() => console.log("!!! 连接数据库失败"));

module.exports = { sequelize };

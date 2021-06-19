const UserModel = require("../../Models/UserModel");

async function findOneUser(condition, attributes = {}) {
  const res = await UserModel.findOne({ where: condition, attributes });
  return res ? res : false;
}

async function createUser({ email, password, slat }) {
  const res = await UserModel.create({ email, password, slat });
  return res ? res : false;
}

module.exports = { findOneUser, createUser };

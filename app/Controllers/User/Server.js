const { default: validator } = require("validator");
const ServerModel = require("../../../Models/ServerModel");

async function server(ctx) {
  const { id } = ctx.request.user;
  const { server_id } = ctx.request.params;
  let res;
  if (!server_id) {
    // 返回所有用户服务器
    res = await ServerModel.findAll({ where: { user_id: id } });
  } else {
    // 返回指定服务器信息
    res = await ServerModel.findOne({ where: { user_id: id, id: server_id } });
  }
  ctx.assert(res, 500, "获取服务器信息失败");
  ctx.body = res;
}

async function create_server(ctx) {
  const { id } = ctx.request.user;
  const { name, local, ip_addr, bandwidth, token } = ctx.request.body;
  ctx.assert(name && local && ip_addr && bandwidth && token, 400, "服务器信息填写不完整");

  // 创建服务器
  const res = await ServerModel.create({ user_id: id, name, local, ip_addr, bandwidth, token });
  ctx.assert(res, 500, "创建服务器失败");
  ctx.body = { msg: "创建服务器成功" };
}

async function update_server(ctx) {
  const { id } = ctx.request.user;
  const { server_id } = ctx.request.params;
  ctx.assert(server_id, 400, "传递参数错误");

  const { name, local, ip_addr, bandwidth, token } = ctx.request.body;
  ctx.assert(name && local && ip_addr && bandwidth && token, 400, "服务器信息填写不完整");

  // 查找服务器是否存在
  const server = await ServerModel.findOne({ where: { user_id: id, id: server_id } });
  ctx.assert(server, 500, "获取服务器失败");

  // 更新服务器信息
  const res = server.update({ name, local, ip_addr, bandwidth, token });
  ctx.assert(res, 500, "更新服务器失败");
  ctx.body = { msg: "更新成功" };
}

async function delete_server(ctx) {
  const { id } = ctx.request.user;
  const { server_id } = ctx.request.body;
  ctx.assert(server_id, 400, "传递参数错误");

  // 查找服务器是否存在
  const server = await ServerModel.findOne({ where: { user_id: id, id: server_id } });
  ctx.assert(server, 500, "获取服务器失败");

  const res = server.destroy();
  ctx.assert(res, 500, "删除服务器失败");
  ctx.body = { msg: "删除服务器成功" };
}

module.exports = {
  server,
  create_server,
  update_server,
  delete_server,
};

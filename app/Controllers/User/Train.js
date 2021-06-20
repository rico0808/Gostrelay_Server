const ServerModel = require("../../../Models/ServerModel");
const TrainModel = require("../../../Models/TrainModel");

async function train(ctx) {
  const { id } = ctx.request.user;
  const train = await TrainModel.findAll({ where: { user_id: id } });
  ctx.assert(train, 500, "发车列表获取失败");
  ctx.body = train;
}

async function create_train(ctx) {
  const { id } = ctx.request.user;
  const { server_id, name, number, price, port, port_num, traffic } = ctx.request.body;
  ctx.assert(server_id, 400, "服务器选择错误");
  ctx.assert(name && number && price && port && port_num && traffic, 400, "发车信息填写不完整");

  // 判断服务器是否存在
  const server = await ServerModel.findOne({ where: { id: server_id, user_id: id } });
  ctx.assert(server, 400, "服务器不存在");

  // TODO
  // 后期可能需要限制下发车数量

  const res = await TrainModel.create({ user_id: id, server_id, name, number, price, port, port_num, traffic });
  ctx.assert(res, 500, "发车失败");
  ctx.body = { msg: "发车成功" };
}

async function delete_train(ctx) {
  const { id } = ctx.request.user;
  const { train_id } = ctx.request.body;
  ctx.assert(train_id, 400, "车次选择错误");

  // 判断此车是否存在
  const train = await TrainModel.findOne({ where: { user_id: id, id: train_id } });
  ctx.assert(train, 400, "未找到相关车次");

  // TODO
  // 需要判断该车是否有人已经上车

  // 删除车次
  const res = await train.destroy();
  ctx.assert(res, 500, "删除车次失败");
  ctx.body = { msg: "删除车次成功" };
}

module.exports = { train, create_train, delete_train };

const dayjs = require("dayjs");
const OrderModel = require("../../../Models/OrderModel");
const TrainModel = require("../../../Models/TrainModel");
const { findOneUser } = require("../../Service/UserService");

async function order(ctx) {
  const { id } = ctx.request.user;
  const { order_id } = ctx.request.params;
  let order;

  // 通过是否传入 order_id 来判断是获取全部还是单个
  if (order_id) {
    order = await OrderModel.findOne({ where: { user_id: id, id: order_id } });
    ctx.assert(order, 500, "没有找到该车票");
  } else {
    order = await OrderModel.findAll({ where: { user_id: id } });
  }
  ctx.body = order;
}

async function create_order(ctx) {
  const { id } = ctx.request.user;
  const { train_id } = ctx.request.body;
  ctx.assert(train_id, 400, "无效测车次");

  // 确认是否有该车次
  const train = await TrainModel.findOne({ where: { id: train_id } });
  ctx.assert(train, 400, "未找到该车次");

  // 判断用户余额是否够
  const user = await findOneUser({ id });
  console.log(user.balance);
  ctx.assert(user.balance >= train.price, 400, "余额不足，无法上车");

  // 先扣钱 嘿嘿
  let res;
  res = await user.update({ balance: user.balance - train.price });
  ctx.assert(res, 500, "支付失败，无法上车");

  // 开通服务
  res = await OrderModel.create({
    user_id: user.id,
    train_id,
    port_num: train.port_num,
    traffic: train.traffic,
    expore_time: dayjs().add(30, "day"),
  });

  // 上车失败返还扣的钱
  if (!res) {
    ctx.assert(false, 500, "远端错误，上车失败");
    res = await user.update({ balance: user.balance + train.price });
    ctx.assert(res, 500, "返还余额失败，请提交工单处理");
  }

  // 上车成功，给司机打钱
  const dirver = await findOneUser({ id: train.user_id });
  console.log(dirver);
  res = await dirver.update({ balance: dirver.balance + train.price });

  // 打钱失败，记录日志
  ctx.assert(res, 500, `异常的错误，但是上车成功 # ${dirver.id}`);
  ctx.body = { msg: "上车成功，车门焊死" };
}

module.exports = { order, create_order };

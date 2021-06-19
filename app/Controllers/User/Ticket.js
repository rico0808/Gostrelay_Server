const TicketMessage = require("../../../Models/TicketMessageModel");
const TicketModel = require("../../../Models/TicketModel");

async function ticket(ctx) {
  const { id } = ctx.request.user;
  const res = await TicketModel.findAll({ where: { user_id: id } });
  ctx.body = res;
}

async function ticket_content(ctx) {
  const { id } = ctx.request.user;
  const { ticket_id } = ctx.request.params;

  // 获取工单
  const ticket = await TicketModel.findOne({ where: { id: ticket_id, user_id: id } });
  ctx.assert(ticket, 400, "获取工单失败");
  // 获取对应工单回复内容
  const message = await TicketMessage.findAll({ where: { ticket_id } });
  ctx.body = { ticket, message };
}

async function create_ticket(ctx) {
  const { id } = ctx.request.user;
  const { subject } = ctx.request.body;
  ctx.assert(subject, 400, "工单内容未填写");
  const res = await TicketModel.create({ user_id: id, subject });
  ctx.assert(res, 500, "创建工单失败");
  ctx.body = { msg: "创建工单成功" };
}

async function replay_ticket(ctx) {
  const { ticket_id } = ctx.request.params;
  const { message } = ctx.request.body;
  ctx.assert(message, 400, "回复内容未填写");

  // 判断父工单是否存在，防止瞎几巴提交
  let res;
  res = await _parvate_checkTicket(ticket_id);
  ctx.assert(res, 400, "错误的工单");

  // 回复工单
  res = await TicketMessage.create({ ticket_id, message });
  ctx.assert(res, 500, "回复工单失败");
  ctx.body = { msg: "回复工单成功" };
}

async function close_ticket(ctx) {
  const { ticket_id } = ctx.request.params;

  // 判断父工单是否存在，防止瞎几巴关闭
  let res;
  res = await _parvate_checkTicket(ticket_id);
  ctx.assert(res, 400, "错误的工单");

  // 关闭工单 更新父工单状态
  res = await res.update({ status: 2 });
  ctx.assert(res, 500, "关闭工单失败");
  ctx.body = { msg: "关闭工单成功" };
}

async function _parvate_checkTicket(ticket_id) {
  const res = await TicketModel.findOne({ where: { id: ticket_id } });
  return res ? res : false;
}

module.exports = {
  ticket,
  ticket_content,
  create_ticket,
  replay_ticket,
  close_ticket,
};

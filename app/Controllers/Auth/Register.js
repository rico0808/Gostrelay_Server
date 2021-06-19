const { gene_token, slat_crypto } = require("../../Utils/tools");
const TokenModel = require("../../../Models/TokenModel");
const validator = require("validator");
const sendMail = require("../../Service/MailServer");
const { webName, webLink } = require("../../../Config");
const { findOneUser, createUser } = require("../../Service/UserService");
const dayjs = require("dayjs");

async function get_register_url(ctx) {
  const { email } = ctx.request.body;
  ctx.assert(email, 400, "表单信息填写不完整");
  ctx.assert(validator.isEmail(email), 400, "邮箱格式填写错误");

  let res;
  // 判断用户是否已经存在
  res = await findOneUser({ email });
  ctx.assert(!res, 400, "该邮箱已被注册");

  // 生成注册 Token
  const token = gene_token();
  res = await TokenModel.create({ email, token, type: "register" });
  ctx.assert(res, 500, "生成链接失败");

  // 发送邮件 Token
  const mailBody = {
    to: email,
    subject: `${webName} 注册链接`,
    text: `您的注册链接为 [ ${webLink}/#/register/${token} ] 链接有效期 [10] 分钟`,
  };
  res = await sendMail(mailBody);
  ctx.assert(res, 500, "发送邮件失败");
  ctx.body = { msg: "发送邮件成功，请查收" };
}

async function user_register(ctx) {
  const { token } = ctx.request.params;
  // 给予密码默认值，防止用户空密码，为什么不判断空？判断空不麻烦嘛！
  const { password = 1, repassword = 2 } = ctx.request.body;
  ctx.assert(token, 400, "注册链接不存在或错误");

  // 判断链接是否存在
  const findToken = await TokenModel.findOne({ where: { token, type: "register" }, sort: ["id", "DESC"] });
  ctx.assert(findToken, 400, "注册链接不存在");
  // 判断链接是否过期
  const validToken = (Date.now() - findToken.createdAt) / 1000 < 600;
  ctx.assert(validToken, 400, "注册链接已经过期");

  const { email } = findToken;
  ctx.assert(password === repassword, 400, "两次密码输入不一致");

  let res;
  // 先将注册 token 删除
  res = await findToken.destroy();
  ctx.assert(res, 500, "注册失败，处理TOKEN错误");

  // 然后在进行注册
  const slat = password.slice(0, 6);
  res = await createUser({ email, password: slat_crypto(password, slat), slat });
  ctx.assert(res, 500, "远端错误，注册账号失败");
  ctx.body = { msg: "注册账号成功" };
}

module.exports = { get_register_url, user_register };

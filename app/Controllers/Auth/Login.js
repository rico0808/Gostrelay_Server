const { default: validator } = require("validator");
const { findOneUser } = require("../../Service/UserService");
const { jwt_sign } = require("../../Utils/JwtToken");
const { slat_crypto } = require("../../Utils/tools");

async function user_login(ctx) {
  const { email, password } = ctx.request.body;
  ctx.assert(email && password, 400, "表单信息填写不完整");
  ctx.assert(validator.isEmail(email), 400, "邮箱格式填写错误");

  // 查找用户判断用户是否存在
  let res = await findOneUser({ email }, { include: ["password", "slat"] });
  ctx.assert(res, 400, "登录邮箱不存在");
  ctx.assert(slat_crypto(password, res.slat) === res.password, 400, "登录失败，密码错误");

  // 返回 Token
  const token = jwt_sign({ id: res.id, email: res.email });
  ctx.body = { token };
}

module.exports = {
  user_login,
};

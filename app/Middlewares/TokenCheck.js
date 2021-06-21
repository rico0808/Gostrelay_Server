const { jwt_verify } = require("../Utils/JwtToken");

async function tokenCheck(ctx, next) {
  // 判断是否存在TOKEN
  ctx.assert(ctx.headers.authorization, 401, "未登录或登录状态失效");

  const token = ctx.headers.authorization.split(" ")[1];
  const payload = jwt_verify(token);
  ctx.assert(payload, 401, "未登录或登录状态失效");
  ctx.request.user = payload;
  await next();
}

module.exports = tokenCheck;

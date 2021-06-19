const { findOneUser } = require("../../Service/UserService");

async function user_info(ctx) {
  const { id } = ctx.request.user;
  const res = await findOneUser({ id });
  ctx.body = res;
}

module.exports = { user_info };

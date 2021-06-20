const dayjs = require("dayjs");

async function errorHandle(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.log({
      level: "Error",
      time: dayjs().format("YYYY-MM-DD hh:mm:ss"),
      url: ctx.request.url,
      body: ctx.request.body,
      params: ctx.request.params,
      user: ctx.request.user,
      msg: err.message,
    });

    ctx.status = err.status || 500;
    ctx.body = { msg: err.message };
  }
}

module.exports = errorHandle;

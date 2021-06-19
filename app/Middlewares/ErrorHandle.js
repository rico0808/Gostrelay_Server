async function errorHandle(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = { msg: err.message };
  }
}

module.exports = errorHandle;

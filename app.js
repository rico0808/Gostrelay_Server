const Koa = require("koa");
const errorHandle = require("./app/Middlewares/ErrorHandle");
const app = new Koa();

const { auth_router } = require("./app/Routes");

// 中间件
app.use(require("koa-bodyparser")());
app.use(errorHandle);

// 路由
app.use(auth_router.routes());

app.listen(4000, () => {
  console.log("server running as http://127.0.0.1:4000");
});

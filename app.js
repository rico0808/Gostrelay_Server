const Koa = require("koa");
const errorHandle = require("./app/Middlewares/ErrorHandle");
const tokenCheck = require("./app/Middlewares/TokenCheck");
const app = new Koa();

const { auth_router, user_router, ticket_router, server_router } = require("./app/Routes");

// 中间件
app.use(require("koa-bodyparser")());
app.use(errorHandle);

// 路由
app.use(auth_router.routes());
app.use(tokenCheck).use(user_router.routes());
app.use(tokenCheck).use(ticket_router.routes());
app.use(tokenCheck).use(server_router.routes());

app.listen(4000, () => {
  console.log("server running as http://127.0.0.1:4000");
});

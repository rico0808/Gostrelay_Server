const Router = require("@koa/router");

// Auth
const { user_login } = require("../Controllers/Auth/Login"); // 登录
const { get_register_url, user_register } = require("../Controllers/Auth/Register"); // 注册
const { get_reset_url, user_reset } = require("../Controllers/Auth/Forget"); // 重置

// Ticket
const { ticket, create_ticket, replay_ticket, close_ticket, ticket_content } = require("../Controllers/User/Ticket");

// User
const { user_info } = require("../Controllers/User/User");

// Server
const { server, create_server, update_server, delete_server } = require("../Controllers/User/Server");

// Train
const { train, create_train, delete_train } = require("../Controllers/User/Train");

//==========================

// Auth Router
const auth_router = new Router({ prefix: "/auth" });
// 用户登录
auth_router.post("/login", (ctx) => user_login(ctx));

// 用户注册
auth_router.post("/register", (ctx) => get_register_url(ctx));
auth_router.post("/register/:token", (ctx) => user_register(ctx));

// 重置密码
auth_router.post("/reset", (ctx) => get_reset_url(ctx));
auth_router.post("/reset/:token", (ctx) => user_reset(ctx));

//==========================

// User
const user_router = new Router({ prefix: "/user" });
// 用户信息
user_router.get("/", (ctx) => user_info(ctx));

//==========================

// Ticket Router
const ticket_router = new Router({ prefix: "/ticket" });
// 获取工单
ticket_router.get("/", (ctx) => ticket(ctx));
// 创建工单
ticket_router.post("/", (ctx) => create_ticket(ctx));
// 获取单个工单信息
ticket_router.get("/:ticket_id", (ctx) => ticket_content(ctx));
// 回复工单
ticket_router.post("/:ticket_id", (ctx) => replay_ticket(ctx));
// 关闭工单
ticket_router.patch("/:ticket_id", (ctx) => close_ticket(ctx));

//==========================

// Server Router
const server_router = new Router({ prefix: "/server" });
// 获取服务器
server_router.get("/", (ctx) => server(ctx));
// 获取单个服务器
server_router.get("/:server_id", (ctx) => server(ctx));
// 新建服务器
server_router.post("/", (ctx) => create_server(ctx));
// 编辑服务器
server_router.patch("/:server_id", (ctx) => update_server(ctx));
// 删除服务器
server_router.delete("/", (ctx) => delete_server(ctx));

//==========================

// Train Router
const train_router = new Router({ prefix: "/train" });
// 获取车次
train_router.get("/", (ctx) => train(ctx));
// 添加车次
train_router.post("/", (ctx) => create_train(ctx));
// 删除车次
train_router.delete("/", (ctx) => delete_train(ctx));

module.exports = { auth_router, user_router, ticket_router, server_router, train_router };

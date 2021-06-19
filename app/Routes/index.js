const Router = require("@koa/router");

const { user_login } = require("../Controllers/Auth/Login"); // 登录
const { get_register_url, user_register } = require("../Controllers/Auth/Register"); // 注册
const { get_reset_url, user_reset } = require("../Controllers/Auth/Forget"); // 重置

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

module.exports = { auth_router };

const jwt = require("jsonwebtoken");
const { jwtSecurity } = require("../../Config");

function jwt_sign(payload) {
  const token = jwt.sign(payload, jwtSecurity, { expiresIn: 3000 });
  return token;
}

function jwt_verify(token) {
  try {
    return jwt.verify(token, jwtSecurity);
  } catch (err) {
    return false;
  }
}

module.exports = { jwt_sign, jwt_verify };

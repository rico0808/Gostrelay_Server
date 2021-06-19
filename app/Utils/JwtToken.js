const jwt = require("jsonwebtoken");
const { jwtSecurity } = require("../../Config");

function jwt_sign(payload) {
  const token = jwt.sign(payload, jwtSecurity, { expiresIn: 300 });
  return token;
}

function jwt_verify(token) {
  console.log(jwt.verify(token, jwtSecurity));
}

module.exports = { jwt_sign, jwt_verify };

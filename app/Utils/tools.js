const { SHA256 } = require("crypto-js");

function gene_token() {
  const token = Math.random().toString();
  return SHA256(token).toString().slice(0, 32);
}

function slat_crypto(str, slat) {
  return SHA256(str + slat).toString();
}

module.exports = { gene_token, slat_crypto };

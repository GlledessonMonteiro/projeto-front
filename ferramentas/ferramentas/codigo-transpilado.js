// [S15A2] Forma equivalente, mais compatível com navegadores antigos.
"use strict";

var saudacao = function saudacao() {
  var nome =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : "estudante";

  return "Bem-vindo, ".concat(nome, "!");
};

console.log(saudacao("Ana"));
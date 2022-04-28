// Q6. Resto da divisão entre dois números inteiros positivos fornecidos, n e m
/*
 Formulação recursiva
  f(m, n) = m, se m < n
  f(m, n) = f(m - n, n), se m > n
*/

const resto = (m, n) => m < 0 || n <= 0 || !Number.isInteger(n) || !Number.isInteger(m) ? "Valor inválido" : restoAux(m, n);

const restoAux = (m, n) => m < n ? m : restoAux(m - n, n);

console.log(resto(5, 2));

module.exports = {resto};
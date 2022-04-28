// Q6. Resto da divisão entre dois números inteiros positivos fornecidos, n e m
/*
 Formulação recursiva
  f(m, n) = m, se m < n
  f(m, n) = f(m - n, n), se m > n
*/

const f = (m, n) => m < 0 || n < 0 || !Number.isInteger(n) || !Number.isInteger(m) ? "Valor inválido" : fAux(m, n);

const fAux = (m, n) => m < n ? m : fAux(m - n, n);

console.log(f(5, 2));
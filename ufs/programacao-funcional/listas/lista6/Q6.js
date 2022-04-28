// Q6. Potência natural do número 2
/*
 Formulação recursiva
  f(0) = 1
  f(n) = 2 * f(n - 1)
*/

const f = n => n < 0 || !Number.isInteger(n) ? "Valor inválido" : fAux(n);

const fAux = n => n == 0 ? 1 : 2 * fAux(n - 1);

console.log(f(10));
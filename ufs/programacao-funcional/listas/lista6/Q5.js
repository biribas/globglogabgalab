// Q5. Fatorial de um número natural qualquer.
/*
 Formulação recursiva
  f(0) = 1
  f(n) = n * f(n - 1)
*/

const f = n => n < 0 || !Number.isInteger(n) ? "Valor inválido" : fAux(n);

const fAux = n => n == 0 ? 1 : n * fAux(n - 1);

console.log(f(5));
// Q5. Fatorial de um número natural qualquer.
/*
 Formulação recursiva
  f(0) = 1
  f(n) = n * f(n - 1)
*/

const fatorial = n => n < 0 || !Number.isInteger(n) ? "Valor inválido" : fatorialAux(n);

const fatorialAux = n => n == 0 ? 1 : n * fatorialAux(n - 1);

console.log(fatorial(5));
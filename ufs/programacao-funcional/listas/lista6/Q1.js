// Q1. N-ésimo termo da sequência {3,6,12,24,48,...}.
/*
 Formulação recursiva
  f(1) = 3
  f(n) = 2 * f(n - 1)
*/

const f = n => n < 1 || !Number.isInteger(n) ? "Valor inválido" : fAux(n);

const fAux = n => n == 1 ? 3 : 2 * fAux(n - 1);

console.log(f(5));


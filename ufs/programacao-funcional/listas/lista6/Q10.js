// Q10. Máximo Divisor Comum (MDC) entre dois números inteiros positivos, n e m.
/*
 Formulação recursiva
  f(0, n) = n
  f(m, n) = f(n, m), se m > n
  f(m, n) = f(m, n - m), se m < n
*/

const mdc = (m, n) => m < 0 || n < 0 || !Number.isInteger(n) || !Number.isInteger(m) ? "Valor inválido" : mdcAux(m, n);

const mdcAux = (m, n) => m == 0 ? n : m > n ? mdcAux(n, m) : mdcAux(m, n - m);

console.log(mdc(4, 0));




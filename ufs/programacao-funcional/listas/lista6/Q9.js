// Q9. Mínimo Múltiplo Comum (MMC) entre dois inteiros positivos fornecidos, n e m.
/*
 Formulação recursiva
  f(m, n) = f(m, n, m)
  f(m, n, i) = m, se m % n = 0
  f(m, n, i) = f(m + i, n, i), se m % n != 0
*/

const mmc = (m, n) => m <= 0 || n <= 0 || !Number.isInteger(n) || !Number.isInteger(m) ? "Valor inválido" : mmcAux(m, n, m);

const mmcAux = (m, n, m_aux) => resto(m, n) == 0 ? m : mmcAux(m + m_aux, n, m_aux);

const resto = (m, n) => m < n ? m : resto(m - n, n);

console.log(mmc(12, 60));

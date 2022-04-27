// f(1) = 3
// f(n) = 2 * f(n - 1)

const f = n => n == 1 ? 3 : 2 * f(n - 1);

console.log(f(5));


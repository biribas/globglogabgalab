// f(1) = 0
// f(2) = 1
// f(n) = f(n - 1) + f(n - 2), para n>= 3

const f = n => n < 3 && n - 1 || f(n - 1) + f(n - 2);

console.log(f(6));
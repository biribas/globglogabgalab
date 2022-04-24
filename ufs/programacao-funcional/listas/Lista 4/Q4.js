const list1 = [1, 2, 3, 4]
const list2 = [1, 2, 6, 4]

const howMany = (list1, list2) => list1.reduce((acc, x) => list2.indexOf(x) != -1 ? acc + 1 : acc + 0, 0)

console.log(howMany(list1, list2))
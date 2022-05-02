// Reimplementação do método Array.prototype.reduce()   

Array.prototype.myReduce = function(callback) {
    if (this === null)
        throw new TypeError("this is null or not defined");

    if (arguments.length == 2) {
        return reduce(callback, this, this, 0, arguments[1]);
    }

    const [head, ...tail] = this;
    return reduce(callback, this, tail, 1, head);
}

const reduce = (callback, originalArray, [head, ...tail], index, acc) => {
    if (head === undefined)
        return acc;
    const reducedValue = callback(acc, head, index, originalArray);
    return reduce(callback, originalArray, tail, index + 1, reducedValue);
}

const reducedArray1 = [1, 2, 3, 4].myReduce((acc, e, i, array) => acc + e);
const reducedArray2 = [1, 2].myReduce((acc, e, i, array) => [...acc, ...array], [])

console.log(reducedArray1); // Output: 10
console.log(reducedArray2); // Output: [1, 2, 1, 2]
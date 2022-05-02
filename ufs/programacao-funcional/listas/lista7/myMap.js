// Reimplementação do método Array.prototype.map()

Array.prototype.myMap = function(callback, thisArg) {
    if (this === null)
        throw new TypeError("this is null or not defined");
    
    return map(callback, this, this, 0, thisArg);
}

const map = (callback, originalArray, [head, ...tail], index, thisArg) => {
    if (head === undefined)
        return [];
    
    const mappedValue = callback.call(thisArg, head, index, originalArray);
    return [mappedValue, ...map(callback, originalArray, tail, index + 1, thisArg)];
}

const mappedArray = [0, 1, 2, 3, 4, 5].myMap((e, i, array) => e * i);

console.log(mappedArray); // Output: [0, 1, 4, 9, 16, 25]
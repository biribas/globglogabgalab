// Reimplementação do método Array.prototype.filter()

Array.prototype.myFilter = function(callback, thisArg) {
    if (this == null)
        throw new TypeError("this is null or not defined");
    
    return filter(callback, this, this, 0, thisArg);
}

const filter = (callback, orginalArray, [head, ...tail], index, thisArg) => {
    if (head == undefined)
        return [];
    
    const recursion = filter(callback, orginalArray, tail, index + 1, thisArg);
    const filteredValue = callback.call(thisArg, head, index, orginalArray);
    return filteredValue ? [head, ...recursion] : [...recursion];
}

const filteredArray = [0, 1, 2, 3, 4, 5].myFilter((e, i, array) => e > 1 && e < 5);

console.log(filteredArray); // Output: [2, 3, 4]
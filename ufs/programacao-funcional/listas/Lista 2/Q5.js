distance = (x1, y1, x2, y2) => {
    return x1 == x2 ? Math.abs(y2 - y1) : (y1 == y2 ? Math.abs(x2 - x1) : Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)) 
}

const X1 = 0
const Y1 = 0
const X2 = 2
const Y2 = 2

console.log(distance(X1, Y1, X2, Y2))
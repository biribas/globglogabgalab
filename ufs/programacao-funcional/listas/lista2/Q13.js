const speed = (t0=0, x0=0, t, x) => (x - x0) / (t - t0) + ' m/s'

const T0 = 0 // in seconds
const X0 = 500 // in meters
const T = 10
const X = 600

console.log(speed(T0, X0, T, X))
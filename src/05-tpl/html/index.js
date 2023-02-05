console.info("start")
setImmediate(() => {
    console.info("setImmediate")
})
setTimeout(() => {
    console.info("setTimeout")
})
Promise.resolve().then(() => {
    console.info("promise then")
})
process.nextTick(() => {
    console.info("process.nextTick")
})
console.info("end")
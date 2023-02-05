const http = require('http')
const cpuCoreLength = require('os').cpus().length
const cluster = require('cluster')

if (cluster.isMaster) {
    // 主进程不去提供服务，用来开启子进程，用于派生子进程
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster.fork() // 开启子进程
    }

    cluster.on("exit", Worker => {
        console.info("子进程退出")
        cluster.fork() // 进程守护，一个子进程退出后再开启一个
    })
} else {
    const server = http.createServer((req, res) => {
        res.writeHead(200)
        res.end("hello")
    })

    server.listen(3000)
}
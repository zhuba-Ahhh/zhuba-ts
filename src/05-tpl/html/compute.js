/**
 * @description 子进程，用于计算
 */

function getSum(max = 10000) {
  let sum = 0
  for (let i = 0; i <= max; i++) {
    sum += i
  }

  return sum
}

process.on("message", data => {
  console.info("子进程 pid", process.pid)
  console.info("子进程接收到的信息", data)

  const sum = getSum()

  // 发送消息给主进程
  process.send(sum)
})
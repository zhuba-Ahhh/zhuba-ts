/**
 * 自定义 bind
 */

//@ts-ignore
Function.prototype.MyBind = function (context: any, ...bindArgs: any[]) {
  // context 是 bind 传入的 this
  // bindArgs 是 bind传入的 各个参数

  const self = this; // 当前的函数本身

  return function (...args: any[]) {
    // 拼接参数
    const newArgs = bindArgs.concat(args);
    return self.apply(context, newArgs);
  };
};

function fn(this: any, a: any, b: any, c: any) {
  console.info(this, a, b, c);
}

// @ts-ignore
const fn1 = fn.MyBind({ x: 100 }, 10);
fn1(20, 30);

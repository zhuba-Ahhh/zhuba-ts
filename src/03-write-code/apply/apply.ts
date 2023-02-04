/**
 * 自定义apply
 * @param fn
 * @param args
 */
// @ts-ignore
Function.prototype.myapply = function (context: any, args: any[] = []) {
  if (context == null) context = globalThis;
  if (typeof context !== "object") context = new Object(context); // 值类型

  const fnKey = Symbol(); // 不会出现属性名称的污染
  context[fnKey] = this; // this就是当前的函数

  const res = context[fnKey](...args); // 绑定了this

  delete context[fnKey]; // 清理fn 防止污染

  return res;
};

// function fun(this: any, a: any, b: any, c: any) {
//   console.log(this, a, b, c);
// }

// // @ts-ignore
// fun.myapply({ x: 100 }, [10, 20, 30]);

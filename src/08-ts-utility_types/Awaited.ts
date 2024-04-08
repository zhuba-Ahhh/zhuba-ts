// Awaited<Type>
// 这种类型旨在模拟 async 函数中的 await 之类的操作，或 Promise 上的 .then() 方法 - 特别是它们递归解包 Promise 的方式。

type A = Awaited<Promise<string>>;

type B = Awaited<Promise<Promise<number>>>;

type C1 = Awaited<boolean | Promise<number>>;

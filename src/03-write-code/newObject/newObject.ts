export function newObject<T>(construtor: Function, ...args: any[]): T {
  // 创建一个空对象，继承 construtor 的原型
  const obj = Object.create(construtor.prototype);
  // 将空对象作为 this 执行 construtor,传入参数
  // let result = construtor.apply(obj, args);
  // // 如果构造函数返回一个非基本类型的值，则返回这个值，否则返回刚创建的对象
  // return result instanceof Object ? result : obj;

  construtor.apply(obj, args);
  return obj;
}

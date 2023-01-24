export function myInstanceof(instance: any, origin: any): boolean {
  if (instance == null) return false; // null undefined

  const type = typeof instance;
  if (type !== "object" && type !== "function") return false; // 值类型

  let tempInstance = instance; // 防止修改原参数

  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) return true;
    tempInstance = tempInstance.__proto__; // 顺着原型链向上查找
  }

  return false;
}

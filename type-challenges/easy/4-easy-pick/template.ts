// 实现 TS 内置的 `Pick<T, K>`，但不可以使用它。
// 从类型 `T` 中选择出属性 `K`，构造成一个新的类型。

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// keyof 提取出对象中属性名Key
// extends 限制K一定是后面的东西，结合使用就是K一定是T中属性名Key
// [P in K]: T[P] 将对象K中属性赋值为T中对应值

// js
// function myPick(todos, keys) {
//   const obj = {};

//   keys.forEach((key) => {
//     // 判断其中key是否存在
//     if (key in todos) obj[key] = todos[key];
//   });

//   return obj;
// }

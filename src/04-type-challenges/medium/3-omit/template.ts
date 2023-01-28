// 实现 Omit

// 不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。
// `Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

type MyOmit<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

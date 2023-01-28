// 获取函数返回类型

// 不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

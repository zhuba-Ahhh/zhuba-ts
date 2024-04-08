// ReturnType<Type>
// 构造一个由函数 Type 的返回类型组成的类型。

declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;
type T1 = ReturnType<(s: string) => void>;
type T2 = ReturnType<<T>() => T>;
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
type T4 = ReturnType<typeof f1>;
type T5 = ReturnType<any>;
type T6 = ReturnType<never>;
type T7 = ReturnType<string>;
type T8 = ReturnType<Function>;

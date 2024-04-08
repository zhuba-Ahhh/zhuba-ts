// Extract<Type, Union>
// 通过从 Type 中提取所有可分配给 Union 的联合成员来构造一个类型。

type T04 = Extract<"a" | "b" | "c", "a" | "f">;
type T14 = Extract<string | number | (() => void), Function>;
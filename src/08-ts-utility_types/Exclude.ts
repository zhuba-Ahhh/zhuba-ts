// Exclude<UnionType, ExcludedMembers>
// 通过从 UnionType 中排除所有可分配给 ExcludedMembers 的联合成员来构造一个类型。

type T02 = Exclude<"a" | "b" | "c", "a">;
type T12 = Exclude<"a" | "b" | "c", "a" | "b">;
type T22 = Exclude<string | number | (() => void), Function>;
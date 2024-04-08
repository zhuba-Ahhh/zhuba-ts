// NonNullable<Type>
// 通过从 Type 中排除 null 和 undefined 来构造一个类型。

type T0 = NonNullable<string | number | undefined>;
type T1 = NonNullable<string[] | null | undefined>;

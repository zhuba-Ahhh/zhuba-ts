// ConstructorParameters<Type>
// 从构造函数类型的类型构造元组或数组类型。它生成一个包含所有参数类型的元组类型（如果 Type 不是函数，则生成类型 never）。

type T01 = ConstructorParameters<ErrorConstructor>;
type T11 = ConstructorParameters<FunctionConstructor>;
type T21 = ConstructorParameters<RegExpConstructor>;
type T31 = ConstructorParameters<any>;

type T41 = ConstructorParameters<Function>;
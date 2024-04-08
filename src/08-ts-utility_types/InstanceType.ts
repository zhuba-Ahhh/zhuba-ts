// InstanceType<Type>
// 构造一个由 Type 中的构造函数的实例类型组成的类型。

class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;
type T1 = InstanceType<any>;
type T2 = InstanceType<never>;
type T3 = InstanceType<string>;
type T4 = InstanceType<Function>;

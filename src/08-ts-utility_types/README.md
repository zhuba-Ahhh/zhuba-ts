[utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)

TypeScript 提供了一系列实用的工具类型（utility types），以便于进行常见的类型转换。这些工具类型是全局可用的，可以帮助在工作中更有效地处理类型。

以下是一些常用的 TypeScript 工具类型及其用途：

1. **Awaited<Type>**: 用于模拟 `async` 函数中的 `await` 操作或 `Promise` 的 `.then()` 方法，递归地展开 `Promise`。

2. **Partial<Type>**: 构造一个类型，将 `Type` 中的所有属性设置为可选的。这个工具类型会返回一个代表给定类型所有子集的类型。

3. **Required<Type>**: 构造一个类型，将 `Type` 中的所有属性设置为必需的。这是 `Partial` 类型的相反操作。

4. **Readonly<Type>**: 构造一个类型，将 `Type` 中的所有属性设置为 `readonly`，意味着构造类型中的属性不能被重新赋值。

5. **Record<Keys, Type>**: 构造一个对象类型，其属性键是 `Keys`，属性值是 `Type`。这个工具类型可以用来将类型的属性映射到另一种类型。

6. **Pick<Type, Keys>**: 从 `Type` 中选取属性集 `Keys`（字符串字面量或字符串字面量的联合）构造一个类型。

7. **Omit<Type, Keys>**: 从 `Type` 中选取所有属性，然后移除 `Keys`（字符串字面量或字符串字面量的联合）。

8. **Exclude<UnionType, ExcludedMembers>**: 从 `UnionType` 中排除所有可以赋值给 `ExcludedMembers` 的联合成员。

9. **Extract<UnionType, Union>**: 从 `Type` 中提取所有可以赋值给 `Union` 的联合成员。

10. **NonNullable<Type>**: 从 `Type` 中排除 `null` 和 `undefined`。

11. **Parameters<Type>**: 从函数类型 `Type` 的参数中构造一个元组类型。

12. **ConstructorParameters<Type>**: 从构造函数类型中构造一个元组或数组类型。

13. **ReturnType<Type>**: 构造一个类型，包含函数 `Type` 的返回类型。

14. **InstanceType<Type>**: 构造一个类型，包含 `Type` 中构造函数函数的实例类型。

15. **ThisParameterType<Type>**: 提取函数类型的 `this` 参数的类型。

16. **OmitThisParameter<Type>**: 从 `Type` 中移除 `this` 参数。

这些工具类型在 TypeScript 中非常有用，可以帮助创建更精确和可维护的类型定义。通过使用这些工具类型，可以更容易地处理复杂的类型操作，如解构、映射、过滤和转换。
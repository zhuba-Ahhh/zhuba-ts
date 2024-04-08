// ThisParameterType<Type>
// 提取函数类型的 此 参数的类型，如果函数类型没有 this 参数，则提取 未知。

function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

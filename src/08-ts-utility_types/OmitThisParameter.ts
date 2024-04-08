// OmitThisParameter<Type>
// 从 Type 中删除 this 参数。如果 Type 没有显式声明的 this 参数，则结果只是 Type。否则，将从 Type 创建一个没有 this 参数的新函数类型。泛型被删除，只有最后一个重载签名被传播到新的函数类型中。

function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex());

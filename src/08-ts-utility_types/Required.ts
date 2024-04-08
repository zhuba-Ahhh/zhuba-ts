// // Required<Type>
// 构造一个由设置为 required 的 Type 的所有属性组成的类型。与Partial相反。

interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 };
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
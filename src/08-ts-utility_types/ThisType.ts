// ThisType<Type>
// 此实用程序不返回转换后的类型。相反，它用作上下文 this 类型的标记。请注意，必须启用 noImplicitThis 标志才能使用此实用程序。

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
// 在上面的示例中，makeObject 参数中的 methods 对象具有包含 ThisType<D & M> 的上下文类型，因此 methods 对象内的方法中的 此 类型是 { x: number, y: number } & { moveBy(dx: number, dy: number): number }。请注意 methods 属性的类型如何同时是方法中 this 类型的推理目标和源。

// ThisType<T> 标记接口只是在 lib.d.ts 中声明的一个空接口。除了在对象字面的上下文类型中被识别之外，接口的行为就像任何空接口。
// Readonly<Type>
// 构造一个将 Type 的所有属性设置为 readonly 的类型，这意味着构造类型的属性不能重新分配。

interface Todo2 {
  title: string;
}

const todo3: Readonly<Todo2> = {
  title: "Delete inactive users",
};

todo3.title = "Hello";


// Object.freeze
// function freeze<Type>(obj: Type): Readonly<Type>;
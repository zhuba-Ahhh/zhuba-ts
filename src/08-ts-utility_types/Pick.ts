// Pick<Type, Keys>
// 通过从 Type 中选取一组属性 Keys（字符串字面或字符串字面的并集）来构造一个类型。

interface Todo3 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview1 = Pick<Todo3, "title" | "completed">;

const todo4: TodoPreview1 = {
  title: "Clean room",
  completed: false,
};

todo;

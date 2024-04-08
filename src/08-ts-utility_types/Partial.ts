// Partial<Type>
// 构造一个将 Type 的所有属性设置为可选的类型。此实用程序将返回一个表示给定类型的所有子集的类型。

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1:Todo = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
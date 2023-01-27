import { curry } from "./curry";

describe("curry 函数柯里化", () => {
  it("add 函数 参数刚好", () => {
    function add(a: number, b: number, c: number): number {
      return a + b + c;
    }

    const curryAdd = curry(add);
    let res = curryAdd(1)(2)(3);

    expect(res).toBe(add(1, 2, 3));
  });
});

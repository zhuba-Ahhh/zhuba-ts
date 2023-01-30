import React from "react";
describe("examples for jest expect", () => {
  test("基础类型的比较", () => {
    // 基础类型中大部分比较都可以通过 toBe 完成
    expect(1 + 1).toBe(2); // tobe
    expect(1 + 1).not.toBe(3); // not

    expect(true).toBe(true); // boolean
    expect(undefined).toBe(undefined); // undefined

    // boolean 4个API 用于区分，也可以直接使用
    expect(true).toBe(true);
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();

    // undefined
    expect(undefined).toBe(undefined);
    expect(undefined).not.toBeDefined();
    expect(undefined).toBeUndefined();

    // undefined  对函数返回值的判断
    const test = () => {
      console.log(test);
    };
    expect(test()).toBeUndefined();

    // 浮点数 toBe无法处理
    // expect(0.2 + 0.1).toBe(0.3);
  });
});

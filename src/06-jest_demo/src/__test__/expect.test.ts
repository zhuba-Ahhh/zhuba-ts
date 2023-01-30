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

    // 浮点数比较 使用 oBeCloseTo
    expect(0.2 + 0.1).toBeCloseTo(0.3);

    // toBe 的效果并不等同于 全等 ===， 它是一种更加精确的匹配，应该说等同于 Object.is，这个是 ES6 提供的新方法，相比 ===，
    // 它修复了 JavaScript 历史的两个问题，NaN 和 + (-)0 。

    // NaN toBeNaN 也是 Jest 提供的额外基础断言 API，效果上与toBe(NaN) 也是相同的。
    expect(NaN).toBe(NaN);
    expect(NaN).toBeNaN();
    // +0 -0
    expect(+0).not.toBe(-0);
  });

  // 与基础类型不同的是，引用类型的全等，是对引用类型的内存指针进行比较，对于深拷贝或是属性完全相同的对象，使用 toBe 的断言是不能满足预期的
  // 相比 toBe，toEqual 会深度递归对象的每个属性，进行深度比较，只要原始值相同，那就可以通过断言。
  test("引用类型的比较", () => {
    const a = { obj1: { name: "obj1", obj2: { name: "obj2" } } };
    const b = Object.assign(a);
    const c = JSON.parse(JSON.stringify(a));
    expect(a).toBe(b);
    expect(a).not.toBe(c);
    expect(a).toEqual(b);
    expect(a).toEqual(c);

    expect(1 + 1).toEqual(2);
  });

  test("数字符号", () => {
    // >
    expect(3).toBeGreaterThan(2);
    // <
    expect(3).toBeLessThan(4);
    // >=
    expect(3).toBeGreaterThanOrEqual(3);
    expect(3).toBeGreaterThanOrEqual(2);
    // <=
    expect(3).toBeLessThanOrEqual(3);
    expect(3).toBeLessThanOrEqual(4);
  });

  // toMatch(regexp) 会匹配字符串是否能够满足正则的验证，
  // toMatchObj(value) 则用来验证对象能否包含 value 的全部属性，即 value 是否是匹配对象的子集
  test("正则匹配", () => {
    expect("This is a regexp validation").toMatch(/regexp/);
    const obj = { prop1: "test", prop2: "regexp validation" };
    const childObj = { prop1: "test" };
    expect(obj).toMatchObject(childObj);
  });

  // ● toContain(value) ：判定某个值是否存在在数组中。
  // ● arrayContaining(value)：匹配接收到的数组，与 toEqual 结合使用可以用于判定某个数组是否是另一个数组的子集。
  // ● toContainEqual(value) ：用于判定某个对象元素是否在数组中。
  // ● toHaveLength(value)：断言数组的长度 。
  // ● toHaveProperty(value)：断言对象中是否包含某个属性，针对多层级的对象可以通过 xx.yy 的方式进行传参断言。
  test("表单验证", () => {
    // 数组元素验证
    expect([1, 2, 3]).toContain(1);
    expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 2]));
    expect([{ a: 1, b: 2 }]).toContainEqual({ a: 1, b: 2 });
    // 数组长度
    expect([1, 2, 3]).toHaveLength(3);
    // 对象属性验证
    const testObj = {
      prop1: 1,
      prop2: {
        child1: 2,
        child2: "test",
      },
    };
    expect(testObj).toHaveProperty("prop1");
    expect(testObj).toHaveProperty("prop2.child1");
  });

  // toThrow 和 toThrowError 两个匹配器，这两个匹配器能力都相同，toThrowError 可以理解成是 toThrow 的一个别名
  test("错误抛出", () => {
    const throwError = () => {
      const err = new Error("console err: this is a test error!");
      throw err;
    };
    expect(throwError).toThrow();
    expect(throwError).toThrowError();

    const catchError = () => {
      try {
        const err = new Error("console err: this is a test error!");
        throw err;
      } catch (err) {
        console.log(err);
      }
    };
    expect(catchError).not.toThrow();
    expect(catchError).not.toThrowError();
  });

  test("同步自定义匹配器", () => {
    const toBeBetweenZeroAndTen = (num: number) => {
      if (num >= 0 && num <= 10) {
        return {
          message: () => "",
          pass: true,
        };
      } else {
        return {
          message: () => "expected num to be a number between zero and ten",
          pass: false,
        };
      }
    };
    expect.extend({
      toBeBetweenZeroAndTen,
    });
    expect(8).toBeBetweenZeroAndTen();
    expect(11).not.toBeBetweenZeroAndTen();
  });

  test("异步自定义匹配器", async () => {
    const toBeBetweenZeroAndTen = async (num: number) => {
      const res = await new Promise<{ message: () => string; pass: boolean }>(
        (resolve) => {
          setTimeout(() => {
            if (num >= 0 && num <= 10) {
              resolve({
                message: () => "",
                pass: true,
              });
            } else {
              resolve({
                message: () =>
                  "expected num to be a number between zero and ten",
                pass: false,
              });
            }
          }, 1000);
        }
      );
      return (
        res || {
          message: () => "expected num to be a number between zero and ten",
          pass: false,
        }
      );
    };
    expect.extend({
      toBeBetweenZeroAndTen,
    });
    await expect(8).toBeBetweenZeroAndTen();
    await expect(11).not.toBeBetweenZeroAndTen();
  });
});

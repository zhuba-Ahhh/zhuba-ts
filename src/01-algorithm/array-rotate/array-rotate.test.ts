import { rotate1 } from "./array-rotate";

describe("旋转数组", () => {
  it("正常情况", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;

    const res = rotate1(arr, k);
    const expectRes = [5, 6, 7, 1, 2, 3, 4];
    expect(res).toEqual(expectRes);
  });

  it("数组为空", () => {
    const res = rotate1([], 3);
    expect(res).toEqual([]);
  });

  it("正常情况", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;

    const res = rotate1(arr, k);
    const expectRes = [5, 6, 7, 1, 2, 3, 4];
    expect(res).toEqual(expectRes);
  });

  it("key为负数", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = -3;

    const res = rotate1(arr, k);
    const expectRes = [5, 6, 7, 1, 2, 3, 4];
    expect(res).toEqual(expectRes);
  });

  it("key 是0", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 0;

    const res = rotate1(arr, k);
    expect(res).toEqual(arr);
  });

  it("key 不是数字", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = "abc";

    // @ts-ignore
    const res = rotate1(arr, k);
    expect(res).toEqual(arr);
  });
});

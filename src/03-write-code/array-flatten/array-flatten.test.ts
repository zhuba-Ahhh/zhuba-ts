import { flatten1, flatten2 } from "./array-flatten";

describe("Flatten 数组扁平化", () => {
  const arr0: any[] = [],
    arr1 = [1, 2, 3],
    arr2 = [1, [1, 2]],
    arr3 = [2, [1, 2], [1, [2, [1]]]];
  it("空数组", () => {
    const res1: any[] = flatten1(arr0),
      res2 = flatten2(arr0);

    expect(res1).toEqual([]);
    expect(res2).toEqual([]);
  });

  it("一级嵌套", () => {
    const res1 = flatten1(arr1),
      res2 = flatten2(arr1);

    expect(res1).toEqual([1, 2, 3]);
    expect(res2).toEqual([1, 2, 3]);
  });

  it("二级嵌套", () => {
    const res1 = flatten1(arr2),
      res2 = flatten2(arr2);

    expect(res1).toEqual([1, 1, 2]);
    expect(res2).toEqual([1, 1, 2]);
  });
});

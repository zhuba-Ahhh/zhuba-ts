import { findTwoNumbers2 } from "../two-numbers-sum/two-numbers-sum";

describe("两数之和", () => {
  it("normal", () => {
    const arr = [1, 2, 44, 45, 55];
    const target = 56;
    const arrRes = findTwoNumbers2(arr, target);
    expect(arrRes).toEqual([1, 55]);
  });

  it("空数组", () => {
    const arrRes = findTwoNumbers2([], 1);
    expect(arrRes).toEqual([]);
  });

  it("找不到结果", () => {
    const arr = [1, 2, 44, 45, 55];
    const target = 111;
    const arrRes = findTwoNumbers2(arr, target);
    expect(arrRes).toEqual([]);
  });
});

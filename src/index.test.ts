import quickSort from "./index";

describe("快排", () => {
  it("快排", () => {
    const arr = [1, 2, 1, 2, 3, 4, 1, 2];

    const res = quickSort(arr);
    expect(res).toEqual([1, 1, 1, 2, 2, 2, 3, 4]);
  });
});

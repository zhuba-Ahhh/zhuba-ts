import { binarySearch1 } from "../binary-search/binary-search";

describe("二分法", () => {
  it("normal", () => {
    const arr = [100, 200, 300, 400];
    const indexRes = binarySearch1(arr, 300);
    expect(indexRes).toBe(2);
  });

  it("enpty  array", () => {
    const arr = [];
    const indexRes = binarySearch1(arr, 300);
    expect(indexRes).toBe(-1);
  });

  it("not found", () => {
    const arr = [100, 200, 300, 400];
    const indexRes = binarySearch1(arr, 333);
    expect(indexRes).toBe(-1);
  });
});

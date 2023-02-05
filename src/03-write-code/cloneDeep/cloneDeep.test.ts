import { cloneDeep } from "./cloneDeep";

describe("深拷贝", () => {
  it("值类型", () => {
    expect(cloneDeep(100)).toBe(100);
    expect(cloneDeep("abc")).toBe("abc");
    expect(cloneDeep(null)).toBe(null);
  });

  it("普通对象和数组", () => {
    const obj: any = {
      name: "zhuba",
      info: {
        city: "北京",
      },
      arr: [10, 20, 30],
    };

    const obj1 = cloneDeep(obj);
    obj.info.city = "上海";

    expect(obj1.info.city).toBe("北京");
    expect(obj1.arr).toEqual([10, 20, 30]);
  });

  it("Map", () => {
    const map = new Map([
      ["x", 10],
      ["y", 20],
    ]);

    const map1 = cloneDeep(map);
    expect(map1.size).toBe(2);

    const obj = {
      map: new Map([
        ["x", 10],
        ["y", 20],
      ]),
    };

    const obj1 = cloneDeep(obj);
    expect(obj1.map.size).toBe(2);
  });

  it("Set", () => {
    const set = new Set([10, 20, 30, 30]);

    const set1 = cloneDeep(set);
    expect(set1.size).toBe(3);

    const obj = {
      set: new Set([10, 20, 30, 30]),
    };

    const obj1 = cloneDeep(obj);
    expect(obj1.set.size).toBe(3);
  });

  it("循环引用", () => {
    const a: any = {};
    a.self = a;

    const b = cloneDeep(a);
    expect(b.self).toBe(b);
  });
});

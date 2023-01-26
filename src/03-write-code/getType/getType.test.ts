import { getType } from "./getType";

describe("获取详细的数据类型", () => {
  it("null", () => {
    expect(getType(null)).toBe("null");
  });

  it("undefined", () => {
    expect(getType(null)).toBe("null");
  });

  it("Number", () => {
    expect(getType(100)).toBe("number");
    expect(getType(NaN)).toBe("number");
    expect(getType(Infinity)).toBe("number");
    expect(getType(-Infinity)).toBe("number");
  });

  it("String", () => {
    expect(getType("abc")).toBe("string");
  });

  it("Boolean", () => {
    expect(getType(true)).toBe("boolean");
  });

  it("Symbol", () => {
    expect(getType(Symbol())).toBe("symbol");
  });

  it("BigInt", () => {
    expect(getType(BigInt(100))).toBe("bigint");
  });

  it("Object", () => {
    expect(getType({})).toBe("object");
  });

  it("Array", () => {
    expect(getType([])).toBe("array");
  });

  it("function", () => {
    expect(getType(() => {})).toBe("function");
    expect(getType(class Foo {})).toBe("function");
  });

  it("Map", () => {
    expect(getType(new Map())).toBe("map");
  });

  it("WeakMap", () => {
    expect(getType(new WeakMap())).toBe("weakmap");
  });

  it("Set", () => {
    expect(getType(new Set())).toBe("set");
  });

  it("WeakSet", () => {
    expect(getType(new WeakSet())).toBe("weakset");
  });

  it("date", () => {
    expect(getType(new Date())).toBe("date");
  });

  it("Regexp", () => {
    expect(getType(new RegExp(""))).toBe("regexp");
  });

  it("error", () => {
    expect(getType(new Error())).toBe("error");
  });

  it("Promise", () => {
    expect(getType(Promise.resolve())).toBe("promise");
  });
});

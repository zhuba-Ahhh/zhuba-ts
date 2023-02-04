import "./call";

describe("自定义 call", () => {
  it("绑定this", () => {
    function fn(this: any) {
      return this;
    }
    //@ts-ignore
    const res = fn.mycall({ x: 100 });
    expect(res).toEqual({ x: 100 });
  });

  it("绑定 this —— 值类型", () => {
    function fn(this: any) {
      return this;
    }
    //@ts-ignore
    const res = fn.mycall("abc");
    expect(res.toString()).toEqual("abc");
    //@ts-ignore
    const res1 = fn.mycall(123);
    expect(parseInt(res1)).toBe(123);
    //@ts-ignore
    const res2 = fn.mycall(null);
    expect(res2).not.toBeNull();
  });

  it("绑定参数", () => {
    function fn(a: number, b: number) {
      return a + b;
    }
    //@ts-ignore
    const res = fn.mycall(null, 10, 20);
    expect(res).toBe(30);
  });
});

import "./apply";

describe("自定义 apply", () => {
  it("绑定this", () => {
    function fn(this: any) {
      return this;
    }
    //@ts-ignore
    const res = fn.myapply({ x: 100 });
    expect(res).toEqual({ x: 100 });
  });

  it("绑定 this —— 值类型", () => {
    function fn(this: any) {
      return this;
    }
    //@ts-ignore
    const res = fn.myapply("abc");
    expect(res.toString()).toEqual("abc");
    //@ts-ignore
    const res1 = fn.myapply(123);
    expect(parseInt(res1)).toEqual(123);
    //@ts-ignore
    const res2 = fn.myapply(null);
    expect(res2).not.toBeNull();
  });

  it("绑定参数", () => {
    function fn(a: number, b: number) {
      return a + b;
    }
    //@ts-ignore
    const res = fn.myapply(null, [10, 20]);
    expect(res).toBe(30);
  });
});

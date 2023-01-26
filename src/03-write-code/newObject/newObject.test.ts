import { newObject } from "./newObject";

describe("自定义 new", () => {
  it("new", () => {
    class Foo {
      name: string;
      city: string;
      n: number;

      constructor(name: string, n: number) {
        this.name = name;
        this.city = "HengYang";
        this.n = n;
      }

      getName() {
        return this.name;
      }
    }

    // const f = newObject<Foo>(Foo, "zhuba", 20);

    // expect(f.name).toBe("zhuba");
    // expect(f.city).toBe("HengYang");
    // expect(f.n).toBe(20);
    // expect(f.getName).toBe("zhuba");
  });
});

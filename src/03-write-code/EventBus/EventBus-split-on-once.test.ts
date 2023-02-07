import { EventBus } from "./EventBus-split-on-once";

describe("手写自定义事件 EventBus-split-on-once 总线", () => {
  it("on|emit 绑定事件|触发事件", () => {
    const event = new EventBus();

    const fn1 = jest.fn(); // jest mock function
    const fn2 = jest.fn(); // jest mock function
    const fn3 = jest.fn(); // jest mock function

    event.on("key1", fn1);
    event.on("key1", fn2);
    event.on("key2", fn3);

    event.emit("key1", 10, 20);

    expect(fn1).toBeCalledWith(10, 20); // 被什么调用
    expect(fn2).toBeCalledWith(10, 20); // 被什么调用
    expect(fn3).not.toBeCalled(); // 没有被调用
  });

  it("off 解绑单个事件", () => {
    const event = new EventBus();

    const fn1 = jest.fn(); // jest mock function
    const fn2 = jest.fn(); // jest mock function

    event.on("key1", fn1);
    event.on("key1", fn2);

    event.off("key1", fn1);

    event.emit("key1", 11, 21);

    expect(fn1).not.toBeCalled();
    expect(fn2).toBeCalledWith(11, 21);
  });

  it("off 解绑所有事件", () => {
    const event = new EventBus();

    const fn1 = jest.fn(); // jest mock function
    const fn2 = jest.fn(); // jest mock function

    event.on("key1", fn1);
    event.on("key1", fn2);

    event.off("key1");

    event.emit("key1", 12, 22);

    expect(fn1).not.toBeCalled();
    expect(fn2).not.toBeCalled();
  });

  it("once", () => {
    let count = 0;
    const event = new EventBus();
    // 当fn1、fn2执行时 count++
    const fn1 = jest.fn(() => count++); // jest mock function
    const fn2 = jest.fn(() => count++); // jest mock function

    event.once("key1", fn1);
    event.once("key1", fn2);

    // 无论emit多少次都执行一次fn1和一次fn2
    event.emit("key1", 13, 23);
    event.emit("key1", 13, 23);
    event.emit("key1", 13, 23);
    event.emit("key1", 13, 23);

    expect(count).toBe(2);

    // 错误方案
    // // jest toBeCalled toBeCalledWith只能使用一次
    // expect(fn1).toBeCalledWith(13, 23); // 被什么调用
    // expect(fn2).toBeCalledWith(13, 23); // 被什么调用

    // event.emit("key1", 13, 23);
    // expect(fn1).not.toBeCalled();
    // expect(fn2).not.toBeCalled();
  });
});

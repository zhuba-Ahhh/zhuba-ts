// 1- on和once 注册并存储函数
// 2- emit 找到并执行相应的函数
// 3- off 找到并删除相应的函数
// 4- on和once on绑定的事件可以多次执行，除非off; once绑定的函数emit一次即删除，也可以未执行而被off;所以需要在数据结构中标明on、once
// 5- 事件是有序的，有执行先后顺序

/**
 *
 * 手写自定义事件 EventBus 总线 => on once \ emit \ off
 * @class EventBus
 */
export class EventBus {
  private events: {
    [key: string]: Array<{ fn: Function; isOnce: boolean }>;
  };

  constructor() {
    this.events = {};
  }

  /**
   *
   * on 绑定函数可多次触发
   * @param {string} type
   * @param {Function} fn
   * @param {boolean} [isOnce=false]
   * @memberof EventBus
   */
  on(type: string, fn: Function, isOnce: boolean = false) {
    const events = this.events;
    if (events[type] == null) events[type] = []; // 初始化 key 的 fn数组

    events[type].push({ fn, isOnce });
  }

  /**
   *
   * 绑定函数，并只会执行一次
   * @param {string} type
   * @param {Function} fn
   * @memberof EventBus
   */
  once(type: string, fn: Function) {
    this.on(type, fn, true); // 复用逻辑
  }

  /**
   *
   * 解绑事件
   * @param {string} type
   * @param {Function} [fn]
   * @memberof EventBus
   */
  off(type: string, fn?: Function) {
    if (!fn) {
      // 若果fn没有值，就解绑所有 type 的函数
      this.events[type] = [];
    } else {
      // 解绑单个fn
      const typeFnList = this.events[type];
      if (typeFnList) {
        this.events[type] = typeFnList.filter((typeFn) => typeFn.fn !== fn);
      }
    }
  }

  emit(type: string, ...args: any[]) {
    const typeFnList = this.events[type];
    if (typeFnList == null) return;

    this.events[type] = typeFnList.filter((typeFn) => {
      const { fn, isOnce } = typeFn;
      fn(...args);

      // once 执行一次就被过滤掉
      if (!isOnce) return true;
      else return false;
    });
  }
}

const e = new EventBus();

function fn1(a: any, b: any) {
  console.log("fn1", a, b);
}
function fn2(a: any, b: any) {
  console.log("fn2", a, b);
}
function fn3(a: any, b: any) {
  console.log("fn3", a, b);
}

e.on("key1", fn1);
e.on("key1", fn2);
e.once("key1", fn3); // 只会被触发一次
e.on("key2", fn3);

e.emit("key1", 10, 20); // 触发 fn1、fn2、fn3
e.emit("key1", 11, 22); // 触发 fn1、fn2

e.off("key1", fn1); // 解绑 fn1

e.emit("key1", 100, 200); // 触发 fn2

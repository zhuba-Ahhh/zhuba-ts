#### 一、快速创建 0-n 的数组

```js
/**
 * 1. for 循环
 * 2. Array.from({ length: 10 }).map((v, k) => k)
 */
```

#### 二、实现 promise

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  constructor(executor) {
    let self = this;
    self.status = PENDING;
    self.value = undefined;
    self.reason = undefined;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.reason = reason;
        self.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    //处理then里面不是回调函数情况
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let self = this;
    return new MyPromise((resolve, reject) => {
      if (self.status === "fulfilled") {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      if (self.status === "rejected") {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      if (self.status === "pending") {
        self.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            let x = onFulfilled(self.value);
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
          }, 0);
        });
        self.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            let x = onRejected(self.reason);
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
          }, 0);
        });
      }
    });
  }
}
```

#### 三、如何统计 $nextTick 的调用次数

```js
// main.js
let count = 0;

const nextTick = Vue.nextTick;
Vue.prototype.$nextTick = function (fn) {
  count++;
  console.info("$nextTick调用次数", count);
  return nextTick(fn, this);
};
```

#### 四、实现 Promise.all

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error("arguments must be array");
    }

    let resolveCounter = 0;
    const promiseLength = promises.length;
    const result = [];

    for (let i = 0; i < promiseLength; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          resolveCounter++;
          result[i] = value;
          if (resolveCounter === promiseLength) {
            return resolve(result);
          }
        },
        (error) => {
          return reject(error);
        }
      );
    }
  });
}

// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p3, p1, p2]).then((res) => {
  console.log(res); // [3, 1, 2]
});
```

#### 五、谈谈构造函数

JavaScript 语言使用构造函数（constructor）作为对象的模板，所谓“构造函数”，就是专门用来生成实例对象的函数，它就是对象的模板，描述实例对象的基本结构。
一个构造函数可以生成多个实例对象，这些实例对象都有相同的结构。都可以使用这个构造函数的属性与方法。
**构造函数就是普通的函数，但是有自己的特征和用法**
构造函数特点：
函数内部使用了 this 关键字，代表了所要生成的对象实例；
生成对象的时候，必须使用 new 命令

#### 六、谈谈 TypeScript 中的 类

TypeScript 是**面向对象**的 JavaScript；
类描述了所创建的对象的属性和方法；
TypeScript 支持面向对象的多有特性，比如 类、接口等。

定义类的关键字为 class，后买你紧跟类名，
类的数据成员：
字段 - 字段是类里面生命的变量，字段表示对象的有关数据；
构造函数 - 类实例化时调用，可以为类的对象分配内存；
方法 - 方法为对象要执行的操作

#### 七、instanceof 原理

判断当前实例的隐式原型是否指向（等于）目标对象的原型，顺着原型链向上判断（直到为 null）

```ts
export function myInstanceof(target: any, origin: any): boolean {
  if (target == null) return false; // null undefined 返回 false

  const type = typeof target;
  if (type !== "object" && type !== "function") {
    // 所有的值类型 instanceof 都返回 false
    return false;
  }

  let tempTarget = target; // 防止修改 target
  while (tempTarget) {
    if (tempTarget.__proto__ === origin.prototype) {
      return true;
    }

    tempTarget = tempTarget.__proto__;
  }

  return false;
}
```

#### 八、Vue 双向绑定原理

做双向绑定时通常会使用`v-model`，在编译时可以解析可以解析`v-model`，在做操作时，在当前`v-model`所属元素上添加事件监听，把`v-model`指定的那个事件回调函数作为`input`事件监听的回调函数，如果`input`发生变化，可以把新值设置到`vue`实例上，`vue`实例实现了数据的响应化，响应化的`set`函数会触发界面中所有模型的依赖的更新，会通知所有依赖去做更新和刷新操作。

**Vue 编译过程是怎样的？以及什么是编译？为什么要编译？**

首先`Vue`写的模板语句`html`不能识别，通过编译的过程可以进行依赖收集，进行依赖收集之后，在`data`中的数据模型和视图之间产生绑定关系，以后如果模型发生变化时，可以通知这些依赖的地方更新，这就是编译的目的，编译之后可以做到模型驱动视图变化。

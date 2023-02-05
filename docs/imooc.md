### `前端基础知识`

#### 一、Ajax-Fetch-Axios 三者有什么区别？

​ 三者都用于网络请求，但是不同维度

​ Ajax 是一种技术统称

​ Fetch 是一个具体的 API，浏览器原生 API，和 XHRHttpRequest 一个级别，语法更简洁、易用，支持 Promise

​ Axios 是第三方库（随着 Vue 火爆起来），https://axios-http.com/，内部可用XMLHttpRequest和Fetch来实现

​ 基础面试题：**用 XMLHttpRequest 实现 Ajax**

```js
function ajax1(url, method = "get", headers = [], body) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    for (let key in headers) {
      // 设置 http 请求头部的方法，必须在open()之后
      request.setRequestHeader(key, headers[key]);
    }
    request.onreadychange = function () {
      if (request.readyState === 4) {
        if (request.status === 200 || request.status === 304) {
          resolve(request.responseText);
        } else {
          reject(request);
        }
      }
    };
    request.send(body);
  });
}

function ajax2(url, successFn) {
  const xhr = new XHTHttpRequest();
  xhr.open("GET", url, false);
  xhr.onreadychange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(xhr.reponseText);
      }
    }
  };
  xhr.send(null);
}

// fetch更加简洁
function ajax3(url) {
  return fetch(url).then((res) => res.json);
}
```

lib（库）和 API 的区别：
API 是一些原生的函数，lib 是第三方的工具

#### 二、节流和防抖

区别、分别用于什么场景

**防抖：**将页面中短时间多次重复的操作/请求融合成一条操作/请求

**标准答案：**限制执行次数，多次密集的触发只执行一次

```js
// 最基本的防抖函数
function debounce(fn, delay = 200) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 透传 this 和参数
      timer = null;
    }, delay);
  };
}
```

**节流：**节省交流和沟通（“别急，一个一个来，按时间节奏，插队者无效”）。按节奏进行操作/请求

**标准答案：**限制执行的频率，有节奏地执行

例：drag 或者 scroll 的过程中触发的回调，要设置一个时间间隔

```js
function throttle(fn, interval = 100) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, interval);
  };
}
```

**实际工作中可使用 https://loadsh.com/**

#### 三、px、%、em、rem、vw/vh 有什么区别

px：基本单位，绝对单位（其它的都是相对单位）

%：相对于父元素的宽度比例

em：相对于当前元素（当前元素没有 font-size 时则相对于父元素）的 font-size

rem：相对于根节点（html）的 font-size

vm/vh：vw 是屏幕宽度的 1%，vh 是屏幕高度的 1%

#### 四、箭头函数

缺点、什么时候不能使用箭头函数

**缺点：**

​ 1、没有 arguments；

​ 2、无法使用 apply、call、bind 改变 this

​ 3、某些箭头函数代码难以阅读

```js
const fn = (a, b) => (b === undefined ? (b) => a * b : a * b);
```

**不适用情况：**

1、对象方法；

```js
const obj = {
  name: "zhihui",
  getName: () => this.name,
};
console.log(obj.getName()); // ""
```

2、原型方法

```js
const obj = { name: "zhihui" };
obj.__proto__.getName = () => this.name;
console.log(obj.getName()); // ""
```

3、构造函数

```js
const Foo = (name, city) => {
  this.name = name;
  this.city = city;
};
const foo = new Foo("zhihui", "beijing"); // 报错 Foo is not a constructor
```

4、动态上下文中的回调函数

```js
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  // 此时 this 指向父作用域，不指向 btn
  // console.log(this === window) // true
  this.innerText = "clicked";
});
```

5、Vue 生命周期和 method

Vue 本质是 JS 对象（对象方法不能使用箭头函数，第 1 点）

```js
{
	data() { return { name: "zhihui" } },
	methods: {
		getName: () => this.name // 报错：Cannot read properties of undefined (reading 'name')
		// getName() {
		//	 return this.name // 正常
		// }
	},
    mounted: () => {
        // 报错：Cannot read properties of undefined (reading 'name')
        console.log(this.name)
    },
    // mounted() {
    //    console.log(this.name) // 正常
    // }
}
```

**注意：**React 可以，React 组件（非 hooks）本质是一个 ES6 class

```js
class Foo {
  constructor(name, city) {
    this.name = name;
    this.city = city;
  }
  getName = () => this.name;
}
const foo = new Foo("zhihui", "beijing");
console.log(foo.getName()); // zhihui
```

#### 五、TCP 三次握手和四次挥手

三次握手：是为了建立连接，确定 client 和 server 都有接发消息的能力，首先 client 向 server 发送建立连接的请求，server 收到后向 client 回复消息表示已收到请求，准备建立连接，client 收到回复消息后再次向 server 发送消息确认建立连接

四次挥手：是为了断开链接，client 向 server 发送请求断开连接的消息，server 收到消息并回复消息，表示准备断开连接，之后 server 再次向 client 发送消息表述传输已完成，表示可以断开连接，client 收到消息后向 server 回复断开链接的消息

_首先，tcp 是可靠传输协议，需要三次握手建立连接服务。_

_三次握手的目的是“为了防止已经失效的连接请求报文段突然又传到服务端，因而产生错误”，这种情况是：client 端发出了一个连接请求报文，而是因为某些未知的原因在某个网络节点上发生延迟、滞留，导致延迟到连接释放以后的某个时间才到达 server 端。本来这是一个早已失效的报文段，但是 server 收到此失效的报文之后，会误认为是 client 再次发出的一个新的连接请求，于是 server 端就向 client 又发出确认报文，表示同意建立连接。如果不采用“三次握手”，那么只要 server 端发出确认报文就会认为新的连接已经建立了，但是 client 端此时并没有发出建立连接的请求，因此不会去向 server 端发送数据，server 端没有收到数据就会一直等待，产生死锁现象，这样 server 端就会白白浪费掉很多资源。如果采用“三次握手”的话就不会出现这种情况，client 端首先发出连接请求并进入等待状态，server 接收连接请求后同意建立连接，并向 client 返回报文段表示已经建立连接 server 进入 SYN_RECV 状态，client 接收到 server 发出的确认信息后自己再发出确认信息，然后就可以建立直接通信。所以说只有三次握手在逻辑上才是最合适的，可以保障可靠性。_

_三次握手的最主要目的是保证连接是双工的，可靠更多的是通过重传机制来保证的。_

#### 六、JS 中 for-in 和 for-of 有什么区别

1、for-in 遍历拿到 key，for-of 遍历拿到 value；

2、适用于不同的数据类型，

​ 遍历对象：for...in 可以，for...of 不可以

​ 遍历 Map、Set：for...of 可以，for...in 不可以

​ 遍历 generator：for...of 可以，for...in 不可以

```js
const obj = {
  name: "zhihui",
  city: "beijing",
};
for (const key in obj) {
  console.log(key); // name city
}

for (const value of obj) {
  console.log(value); // 报错 Uncaught TypeError: obj is not iterable
}
```

3、for...in 用于可枚举数据，如 对象、数组、字符串，得到 key；

​ for...of 用于可迭代数据，如数组、字符串、Map、Set，得到 value

#### 七、for-await-of 有什么作用

遍历多个异步

```js
function createPromise(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, 1000);
  });
}

(async function () {
  const p1 = createPromise(100);
  const p2 = createPromise(200);
  const p3 = createPromise(300);

  const list = [p1, p2, p3];

  // Promise.all(list).then(res => console.log(res)) // [100, 200, 300]

  for await (let res of list) {
    console.log(res); // 100 200 300
  }
})();
```

异步迭代器(for-await-of)：循环等待每个 Promise 对象变为 resolved 状态才进入下一步

```js
function Gen(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}
async function test() {
    let arr = [Gen(2000), Gen(100), Gen(3000)]
    for (let item of arr) {
        console.log(Date.now(), item.then(console.log))
    }
}

// 输出
1651760747409 Promise
1651760747409 Promise
1651760747409 Promise
100
2000
3000
```

#### 八、offsetHeight、scrollHeight、clientHeight 有什么区别

offsetHeight：border + padding + content

scrollHeight：padding + 实际内容尺寸（含有滚动条情况）

clientHeight：padding + content

#### 九、HTMLCollection 和 NodeList 的区别

**相同点：**

都是类数组，都具有 length 属性，都是动态合集（querySelectorAll 方法返回的 NodeList 是静态的，不会随着文档节点的增添而改变）

**不同点：**

HTMLCollection 是 Element 的集合（html 元素的集合，可以通过 id、name 或索引获取元素）

NodeList 是 Node 的集合，文档节点的集合，只能通过索引获取

```html
<p id="p1">p1</p>
<p id="p2">p2</p>
<script>
  const htmlList = document.getElementsByTagName("*");
  const nodeList = document.querySelectorAll("*");

  console.log("htmlList: ", htmlList);
  console.log(htmlList.p1, htmlList.p2);
  console.log("nodeList: ", nodeList);
  console.log(nodeList.p1, nodeList.p2);

  // htmlList:  HTMLCollection(8) [html, head, meta, title, body, p#p1, p#p2, script, p1: p#p1, p2: p#p2]
  // <p id="p1">p1</p> <p id="p2">p2</p>
  // nodeList:  NodeList(8) [html, head, meta, title, body, p#p1, p#p2, script]
  // undefined undefined
</script>
```

```html
<p id="p1">
  <b>node</b> vs <em>element</em
  ><!--注释-->
</p>
<script>
  const p1 = document.getElementById("p1");
  console.log(p1.children); // HTMLCollection(2) [b, em]
  console.log(p1.childNodes); // NodeList(4) [b, text, em, comment]
</script>
```

#### 十、Vue 的 computed 和 watch 有什么区别

computed 是计算产生新数据（有缓存，method 无缓存）

watch 是监听现有数据变化

#### 十一、Vue 组件通讯方式

1、props 和$emit；

```text
父组件 A 通过 props 的方式向子组件 B 传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现。
```

2、自定义事件（$emit/$on）

```text
这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。

var Event=new Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,data => {});
```

3、$attrs（$attributes）/ $listeners

```text
$attrs：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 interitAttrs(可以关闭自动挂载到组件根元素上的没有在 props 声明的属性) 选项一起使用。
$listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件。
```

4、$parent（$children）

5、$refs

6、provide/inject（`provide` 和 `inject` 绑定并不是可响应的，可以把 this 传入 或者使用 Vue.observable()）

7、Vuex（状态管理库）

```text
vuex的五个属性及使用
1. state: 基本数据，存储变量  this.$store.state.a
	const store = new Vuex.store({
		state: {
			a: 'true',
			b: 2,
			c: false,
			d: null
		}
	})

	const app = createApp({ /* 根组件 */ })
    // 将 store 实例作为插件安装
    app.use(store)
2. getters: 从基本数据派生的数据，相当于 state 的计算属性，具有返回值的方法  this.$store.getters.a
	getter: {
		a: state => state.a,
		b: state => state.b * 2
	}
3. mutation: 提交更新数据的方法，必须是同步的。每个 mutation 都有一个字符串的事件类型和一个回调函数
	mutations: {
		a: (state, userId) => {
			state.userId = userId
		},
		b: (state, token) => {
			state.token = token
		}
	}
4. action: 和 mutation 的功能大致相同；不同：1. Action 提交的是 mutation，而不是直接变更状态；2.Action可以包含异步操作。dispatch：异步操作，写法：this.$store.dispatch('action方法名', 值)
	actions: {
		a({ commit }, value) {
			commit('SET_USER', value)
		}
	}
5. modules：模块化 vuex，可以让每一个模块拥有自己的 state、getters、mutation、action
```

**扩展：**vuex 页面刷新数据丢失问题的四种解决方式

1.  sessionStorage（sessionStorage 不是响应式的，需同步更新）

2.  vuex-along 、vuex-presistedstate、vuex-persist（使用方法大同小异）

```
import Vue from 'vue'
import Vuex from 'vuex'
import indexOne from "./modules/indexOne"
import VueXAlong from 'vuex-along'

Vue.use(Vuex)
const store=new Vuex.Store({
    strict: false,
    modules:{
        indexOne
    },

    plugins: [
        VueXAlong({
            // 存放在localStroage或者sessionStroage 中的名字
            name: 'along',
            //是否存放在local中  false 不存放 如果存放按照下面session的配置配
            local: false,
            // 如果值不为false 那么可以传递对象 其中 当isFilter设置为true时，
            //list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
            session: { list: [], isFilter: true }
        })
    ]

})

export default store;3.
```

#### 十二、Vuex 中 action 和 mutation 有什么区别

mutation：原子操作；必须是同步代码

action：可包含多个 mutation；可包含异步代码

#### 十三、严格模式有什么特点

'use strict'（也可在函数内部开启）

**特点：**

全局变量必须先声明

禁止使用 with

创建 eval 作用域

禁止 this 指向 window

函数参数不能重名

```html
<script>
  "use strict";
  var a = 10;
  eval(`var a = 20; console.log('in eval: ', a)`); // 20 (一般不推荐使用)
  console.log("out eval: ", a); // 10

  function fn() {
    console.log("this: ", this); // undefined
  }
  fn();
</script>
```

#### 十四、HTTP 跨域为何发送 options 请求

**跨域：**

浏览器同源策略（浏览器的安全策略，禁止网页访问第三方域名的资源）

同源策略一般限制 Ajax 网络请求，不能跨域请求 server

不会限制 <link> <script> <img> <iframe>

**JSONP**

```html
<!-- www.aaa.com 网页 -->
<script>
  window.onSuccess = function (data) {
    console.log(data);
  };
</script>
<!-- 把返回的内容当js执行 -->
<script src="https://www.bbb.com/api/getData"></script>

// https://www.bbb.com/api/getData 返回了一段字符串："onSuccess({ error: 0,
data: { /** */ } }) "
```

**CORS**

```js
// CORS 配置允许跨域
response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080/"); // 或者 “*”
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader(
  "Access-Control-Allow-Methods",
  "GET、POST、DELETE、PUT、OPTIONS"
);
response.setHeader("Access-Control-Allow-Credentials", "ture"); // 允许跨域接收 cookie
```

options 请求是跨域前的预检查（判断服务端是否满足当前查询）

浏览器自行发起，无需开发干涉

不会影响实际功能

### `知识深度-原理和源码`

#### 十五、JS 内存垃圾回收的算法

**垃圾回收：**回收函数执行之后再也用不到的对象或数据

1、引用计数（以前，早期浏览器）

```js
let obj = { x: 100 }; // 对象被 obj 引用，引用数为 1
let a1 = obj; // 对象又被 a1 引用，引用数为 2
a1 = 10; // 引用数为 1
obj = null; // 引用数为 0（此时对象内存被回收）

// 引用计数有缺点（无法处理循环引用的问题）
// 循环引用
function fn() {
  const obj1 = {};
  const obj2 = {};
  obj1.a = obj2;
  obj2.a = obj1;
}
fn();

// IE6-7内存泄漏BUG
const div1 = document.getElementById("div1");
div1.a = div1;
div1.someBigData = {};
```

2、标记清除（现在，现代浏览器）

```js
// 定期从 window 中遍历各个属性，如果能得到某个对象，就保留；不能得到就删除
```

**内存泄漏：**一些非预期的内存无法回收（闭包不是内存泄漏，闭包的数据无法被垃圾回收）

#### 十六、如何检测 JS 内存泄漏

检测内存变化（内存不断地升高并降低，这种情况不算内存泄漏；内存持续升高则表示内存泄漏）

chrome Performance（勾选 Memory）

#### 十七、内存泄漏的场景有哪些

内存泄漏场景（Vue 为例）:

1、被全局变量、函数引用，组件销毁时未清除

2、被全局事件、定时器引用，组件销毁时未清除

3、被自定义事件引用（兄弟组件通信），组件销毁时未清除

#### 十八、内存泄漏的场景有哪些-扩展-WeakMap 和 WeakSet

弱引用，

```js
// const data = {}
// const map = new Map()
const wMap = new WeakMap();
function fn() {
  const obj = { x: 100 };
  // data.obj = obj
  // map.set("o", obj)
  wMap.set(obj, 100);
}

fn(); // WeakMap不会影响 obj 的回收
```

#### 十九、浏览器和 nodejs 事件循环（Event Loop）有什么区别

**浏览器：**

单线程和异步：

1、JS 是单线程的（无论在浏览器还是 nodejs）

2、浏览器中 JS 执行和 DOM 渲染公用一个线程

3、异步

异步里面分为宏任务和微任务

**宏任务：**setTimeout、setInterval、网络请求

**微任务：**promise async/await（MutationObserver：监听 DOM 树变化，不常用）

微任务在下一轮 DOM 渲染之前执行，宏任务在这之后执行

**nodejs：**

**nodejs**宏任务类型和优先级

1、TImers - setTimeout setInterval

2、I/O callbacks-处理网络、流、TCP 的错误回调

3、Idle，prepare - 闲置状态（nodejs 内部使用）

4、Poll 轮询 - 执行 poll 中的 I/O 队列

5、Check 检查 - 存储 setImmediate 回调

6、Close callbacks - 关闭回调，如 socket.on("close")

**nodejs**微任务类型和优先级

包括：promise，async/await，process.nextTick

其中 process.nextTick 优先级最高

```nodejs
// nodejs 环境
console.info("start")
setImmediate(() => {
    console.info("setImmediate")
})
setTimeout(() => {
    console.info("setTimeout")
})
Promise.resolve().then(() => {
    console.info("promise then")
})
process.nextTick(() => {
    console.info("process.nextTick")
})
console.info("end")

// 输出
start
end
process.nextTick
promise then
setTimeout
setImmediate
```

**浏览器和 nodejs 的 event loop 流程基本相同**

**nodejs 宏任务和微任务分类型，有优先级**

\*nodejs 新版本中推荐使用 setImmediate 代替 process.nextTick

#### 二十、遍历一个数组用 for 和 forEach 那个更快

```js
<script>
    const arr = []
    for (let i = 0; i < 100 * 10000; i++) {
        arr.push(i)
    }
    const length = arr.length

    console.time("for")
    let n1 = 0
    for (let i = 0; i < length; i++) {
        n1++
    }
    console.timeEnd("for")

    console.time("foreach")
    let n2 = 0
    arr.forEach(() => n2++)
    console.timeEnd("foreach")
</script>
// for: 2.473876953125 ms
// foreach: 7.7978515625 ms
```

forEach 的代码更简洁

for 会更快，forEach 每次都需要创建一个函数（() => n2++）来调用，而 for 不会创建函数，函数需要独立的作用域，会有额外的开销

#### 二十一、nodejs 如何开启多进程，进程如何通信

**进程和线程的区别：**

进程：process 线程：thread

进程，OS（操作系统）进行资源分配和调度的最小单位，有独立内存空间

线程，OS（操作系统）进行运算调度的最小单位，共享进程内存空间

一个进程可以包含多个线程

进程之间不能互相访问（抖音和微信的进程），进程之间可以通讯

JS 是单线程的，但是可以开启多个进程执行，如 WebWorker

nodejs 可以通过 **fork** 和 **cluster** 开启多个进程

**fork 方式**

```nodejs
// index.js
const http = require("http")
const fork = require("child_process")
const server = http.createServer((req, res) => {
	if (req.url === "/get-sum") {
		console.info("主进程 id", process.pid)
		const computeProcess = fork("./compute")
		computeProcess.send("开始计算")
		computeProcess.on("message", data => {
			console.info("接收子进程的消息", data)
			res.send("sum is " + data)
		})

		computeProcess.on("close", () => {
			console.info("子进程因报错而退出")
			computeProcess.kill()
			res.end("error")
		})
	}
})
server.listen(3000, () => {
	console.info("app is running at 3000")
})


// compute.js
function getSum(max = 10000) {
	let sum = 0
	for (let i = 0; i <= max; i++) {
		sum += i
	}
	return sum
}
process.on("message", data => {
	console.info("子进程 id", process.pid)
	console.info("接收主进程的消息", data)
	const sum = getSum()
	process.send(sum)
})
```

**cluster**方式

```nodejs
const http = require('http')
const cpuCoreLength = require('os').cpus().length
const cluster = require('cluster')

if (cluster.isMaster) {
    // 主进程不去提供服务，用来开启子进程，用于派生子进程
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster.fork() // 开启子进程
    }

    cluster.on("exit", Worker => {
        console.info("子进程退出")
        cluster.fork() // 进程守护，一个子进程退出后再开启一个
    })
} else {
    const server = http.createServer((req, res) => {
        res.writeHead(200)
        res.end("hello")
    })

    server.listen(3000)
}
```

实际工作中可以用 pm2 工具来完成进程守护或开启多进程

child_process 多用与单独的计算

cluster（集群） 用于开启多个服务

为何需要开启多进程：为了更好的利用服务器的性能

#### 二十二、描述 js-bridge 的实现原理

什么是 js-bridge

1、JS 无法直接调用 native API（手机中 app）

2、需要通过一些特定的”格式“来调用

3、这些”格式“就统称为 JS-Bridge，例如微信 JSSDK

**实现方式：**

注册全局 API（适合于比较简单的数据通讯，如获取版本等，不适合异步的情 况）

URL Scheme（自造一个协议标准，在 app 层做拦截）

#### 二十三、requestIdleCallback 和 requestAnimationFrame 有什么区别

requestAnimationFrame 每次渲染完都会执行，高优；requestIdleCallback 空闲的时候才会执行，低优

都属于宏任务

#### 二十四、Vue 每个生命周期都做了什么

beforeCreate：创建一个空白的 Vue 实例；data、method 尚未被初始化，不可使用

created：Vue 实例（js 对象）初始化完成，完成响应式绑定；data、method 已经初始化完成，可调用；尚未开始渲染模板（此时只是实例层面，和页面、模板还没有关系）

beforeMount：编译模板，调用 render 生成 vdom；还没有开始渲染 DOM

mounted：DOM 渲染完成；组件创建完成，开始由“创建阶段”进入“运行阶段”

beforeUpdate：data 发生变化之后；准备更新 DOM（尚未更新 DOM）

updated：data 发生变化，且 DOM 更新完成（不要再 updated 中修改 data，可能会导致死循环）

beforeDestory（Vue3.0 中是 beforeUnmount）：组件进入销毁阶段（尚未销毁，可正常使用）；可移除、解绑一些全局事件、自定义事件

destoryed（Vue3.0 中是 unmounted）：组件被销毁了；所有子组件也都能被销毁了

**keep-alive 组件**生命周期

onActivated：缓存组件被激活

onDeactiveted：缓存组件被隐藏

**Vue 什么时候操作 DOM 比较合适**

mounted 和 updated 都不能保证子组件全部挂载完成；使用$nextTick 渲染 DOM

**Ajax 应该放在哪个生命周期**

created 和 mounted 都可以

**Vue3 Composition API 生命周期有何区别**？

用 setup 代替了 beforeCreate 和 created

使用 Hooks 函数的形式，如 mounted 改为 onMounted()

```vue
import { onUpdated, onMounted } from 'vue' export default { setup() {
onMounted(() => { console.log('mounted') }) onUpdated(() => {
console.log('updated') }) } }
```

**扩展：Vue 父子组建生命周期执行顺序**

加载渲染过程：

```text
父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
```

更新过程：

```text
父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
```

销毁过程：

```text
父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed
```

#### 二十五、Vue2、Vue3 和 React 三者的 diff 算法有什么区别

tree diff 算法的优化：

只比较同一层级，不跨级比较

tag 不同则删除掉重建（不去比较内部的细节）

子节点通过 key 区分（key 的重要性）

**不同：**

React diff：仅右移

Vue 2：双端比较

Vue 3：最长递增子序列

**Vue、React 中为何循环时必须使用 key？**

vdom diff 算法会根据 key 判断元素是否要删除

匹配了 key，则只移动元素-性能较好

未匹配到 key，则删除重建-性能较差

#### 二十六、Vue-router 的 MemoryHistory 是什么

**Vue-router 三种模式**

Hash

WebHistory

MemoryHistory（vue-router4 之前叫做 abstract history，切换页面路由一直为同一个）

### `知识广度-从前端到全栈`

#### 二十七、移动端 H5 点击有 300ms 延迟，该如何解决

背景：double tap to zoom

通过使用 FastClick（监听 touchend 事件，移动端 touchstart 和 touchend 事件是先于 click 执行的，click 事件 300ms 后执行）；

width=device-width（说明移动端已做响应式，就没有 300ms 延迟了）

#### 二十八、网络请求中，token 和 cookie 有什么区别-cookie 和 session

HTTP 无状态，每次请求都要带 cookie，以帮助识别身份

服务端也可以向客户端 set-cookie，cookie 大小限制 4kb

默认有跨域限制：不可跨域共享、传递 cookie

cookie 是 HTTP 规范，而 token 是自定义传递

cookie 会默认被浏览器存储，而 token 需自己存储

token 默认没有跨域限制

cookie：HTTP 标准；有跨域限制；配合 session 使用；

token：无标准；无跨域限制；用于 JWT

**JWT（JSON Web Token）**

前端发起登录，后端验证成功之后，返回一个加密的 token

前端自行存储这个 token（其中包含加密之后的用户信息）

以后访问服务端接口，都带着这个 token，作为用户信息

**Session 和 JWT 哪个更好**？

Session 优点：

原理简单，易于学习

用户信息存储在服务端，可快速封禁用户信息

Session 缺点：

占用服务端内存，硬件成本高

多进程，多服务器时，不好同步----需使用第三方缓存，如 redis

JWT 优点：

不占用服务端内存

多进程、多服务器不受影响

没有跨域限制

JWT 缺点：

用户信息存储在客户端，无法快速封禁某用户

万一服务端密钥泄露，则用户信息全部丢失

token 体积一般大于 cookie，会增加请求的数据量

如果有严格用户信息的需求（保密、快速封禁）推荐 Session

如没特殊要求，则使用 JWT（如创业初期的网站）

**如何实现 SSO 单点登录？**

cookie 默认跨域不共享，但有些情况下可设置为共享：

主域名相同，如www.baidu.com image.baidu.com

**设置 cookie domain 为主域名，即可共享 cookie**

**主域名完全不同，则 cookie 无法共享（此时可使用 SSO（第三方服务，登录及校验通过第三方服务进行）技术实现）**

OAuth 2.0（第三方验证登录，微信扫码等）

#### 二十九、HTTP 协议和 UDP 协议有什么区别(了解)

HTTP 协议是在应用层

TCP UDP 协议是在传输层

严格来说应该拿 TCP 和 UDP 进行比较

**TCP 协议：**

有连接（三次握手）

有断开（四次挥手）

稳定传输

**UDP 协议：**

无连接，无断开

不稳定传输，但效率高

如视频会议、语音通话

#### 三十、HTTP 协议 1.0、1.1 和 2.0 有什么区别

HTTP1.0：

最基础的 HTTP 协议；

支持基本的 GET POST 方法

HTTP1.1：

增加了缓存策略 cache-control E-tag 等

```text
cache-control: no-cache | no-store | max-age | must-revalidate
```

支持长连接 Connection：keep-alive，一次 TCP 连接多次请求

支持断点续传，中间状态码 206

支持新的方法 PUT DELETE 等，可用与 RestFul API

HTTP2.0：

可压缩 header，减少体积

多路复用，一次 TCP 连接中可以多个 HTTP 并行请求

服务端推送

#### 三十一、什么是 HTTPS 中间人攻击？如何预防？

HTTP 是明文传输

HTTPS 是加密传输

![](E:\Installed\Tencent\Pictures\QQplayerPic\6-11 什么是 HTTPS 中间人攻击，如[00_13_18][20220404-144803].png)

```text
1. 服务器向客户端发送公钥；
2. 攻击者截获公钥，保留在自己手上；
3. 然后攻击者自己生成一个【伪造的】公钥，发给客户端
4. 客户端收到伪造的公钥后，生成加密hash值发给服务器；
5. 攻击者获得加密的hash值，用自己的私钥解密获得真密钥；
6. 同时生成假的加密hash值，发给服务器；
7. 服务器用私钥解密获得假密钥；
8. 服务器用假密钥加密传输信息。

防范方法：
1. 服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性
```

#### 三十二、script 标签的 defer 和 async 有什么区别

![](E:\Installed\Tencent\Pictures\QQplayerPic\6-12 script 标签的 defer 和[00_01_41][20220404-145152].png)

无：HTML 暂停解析，下载 JS，执行 JS，再继续解析 HTML

defer：HTML 继续解析，并行下载 JS，HTML 解析完成之后再执行 JS

async：HTML 继续解析，并行下载 JS，JS 下载完成之后立马开始执行，HTML 暂停解析，JS 执行之后 HTML 继续解析

#### 三十三、prefetch 和 dns-prefetch 分别是什么

**preload 和 prefetch**

preload 资源在当前页面使用，会优先加载

prefetch 资源在未来页面使用，空闲时加载

```html
<head>
  <!-- preload -->
  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />

  <!-- prefetch -->
  <link rel="prefetch" href="other.js" as="script" />

  <!-- 引用 css -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- 引用 js -->
  <script src="main.js" defer></script>
</body>
```

**dns-prefetch 和 preconnect**

dns-prefetch 即 DNS 的预查询

preconnect 是 DNS 的预连接

```html
<head>
  <link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
</head>
<body>
  <p>hello</p>
</body>
```

prefetch 是资源的预获取（和 preload 相关）

dns-prefetch 是 DNS 预查询（和 preconnect 相关）

#### 三十四、前端攻击手段有哪些，该如何预防

**XSS：**

Cross Site Script 跨站脚本攻击

手段：黑客将 JS 代码插入到网页内容中，渲染时执行 JS 代码（微博、博客之类的发布内容中写脚本）

预防：特殊字符替换（前端或后端）

Vue 和 React 中默认屏蔽 XSS 攻击，但需要注意 v-html、dangerousSetInnerHTML

**CSRF：**

Cross Site Request Forgery 跨站请求伪造

手段：黑客诱导用户去访问另一个网站的接口，伪造请求（例如：通过发送邮件让用户点击邮件中的链接，获取用户的登录信息并以用户的信息请求其它数据）

预防：严格的跨域限制 + 验证码机制

**CSRF 详细过程：**

用户登录了 A 网站，有了 cookie

黑客诱导用户到 B 网站，并发起 A 网站的请求

A 网站的 API 发现有 cookie，认为是用户自己操作的

**CSRF 预防手段：**

严格的跨域请求限制，如判断 referer（请求资源）

为 cookie 设置 SameSite，禁止跨域传递 cookie

**点击劫持：**

Click Jacking

手段：诱导界面上蒙一个透明的 iframe，诱导用户点击

预防：让 iframe 不能跨域加载（response headers 设置 X-Frame-Options: sameorigin，当前网页只在自己域名的 iframe 下加载 ）

**DDoS：**

Distribute denial-of-service 分布式拒绝服务

手段：分布式的、大规模的流量访问，使服务器瘫痪

预防：软件层不好做，需硬件预防（如阿里云 WAF）

**SQL 注入：**

手段：黑客提交内容中写入 SQL 语句，破坏数据库

预防：处理输入内容，替换字符

#### 三十五、WebSoket 和 HTTP 协议有什么区别

**WebSocket：**

支持端对端通讯

可以由 client 发起，也可以由 server 发起

用于消息通知、直播间讨论区、聊天室、协同编辑

**WebSocket 连接过程：**

先发一个 HTTP 请求

成功之后再升级到 WebSocket 协议，再通讯

```html
<html>
  <body>
    const ws = new WebSocketServer('ws://127.0.0.1:3000') ws.onopen = () => {
    console.info('opend') ws.send('client opend') } ws.onmessage = event => {
    console.info(‘接收到信息：’, event.data) }
  </body>
</html>
```

```js
const { WebSocketServer } = require("ws");
const wsServer = new WebSocketServer({ port: 3000 });

wxServer.on("connection", (ws) => {
  console.info("connected");
  ws.on("message", (msg) => {
    console.info("收到了信息", msg.toString());
    // 服务端向客户端发送信息
    setTimeout(() => {
      ws.send("服务端已经收到了信息：" + msg.toString());
    }, 2000);
  });
});
```

**区别：**

WebSocket 协议名是**ws://**，可双端发起请求

WebSocket 没有跨域限制

通过 send 和 onmessage 通讯（HTTP 通过 req 和 res）

ws 可升级为 wss（像 https）

```js
import { createServer } from 'https'
import { readFileSync } from 'fs'
import { WebSocketServer } from 'ws'

const server = createServer({
    cert: readFileSync('/path/to/cert.pem')
    key: readFileSync('/path/to/key.pem')
})
const wss = new WebSocketServer({ server })
```

实际项目中推荐 socket.io，API 更简洁

#### 三十六、WebSocket 和 HTTP 长轮询的区别

HTTP 长轮询：客户端发起请求，服务端阻塞，不会立即返回

WebSocket：客户端可发起请求，服务端也可发起请求

#### 三十七、从输入 URL 到网页显示的完整过程

**一、网络请求**

DNS 查询（得到 IP），建立 TCP 连接（三次握手）

浏览器发起 HTTP 请求

收到请求响应，得到 HTML 源代码

之后还会继续请求静态资源（解析 HTML 过程中，遇到静态资源还会继续发起网络请求，JS、CSS、图片视频等）

注意：静态资源有可能有强缓存，此时不必请求

**二、解析（字符串 --> 结构化）**

HTML 构架 DOM 树

CSS 构建 CSSOM 树（style tree）

两者结合，形成 render tree（渲染树）

优化解析：

CSS 放在<head>中，不要异步加载 CSS

JS 放在<body>最下面（或合理使用 defer async）

<img>提前定义 width height

**三、渲染：Render Tree 绘制到页面**

计算各个 DOM 的尺寸、定位，最后绘制页面

遇到 JS 可能会执行（参考 defer async）

异步 CSS、图片加载，可能会触发渲染

#### 三十八、重绘 repaint 和重排 reflow 有什么区别

动态网页随时都会重绘、重排（网页动画、Modal Dialog 弹窗、增加/删除一个元素，显示/隐藏一个元素）

**重绘 repaint：**

元素外观改变，如颜色、背景色；

但元素的尺寸、定位不变，不会影响其他元素的位置

**重排 reflow：**

重新计算尺寸和布局，可能会影响其他元素的位置

如元素高度增加，可能会使相邻元素位置下移

**区别：**重排比重绘影响要大，消耗也更大

减少重排的方法：

集中修改样式，或直接切换 css class

修改之前先设置 display：none，脱离文档流

使用 BFC 特性，不影响其他元素位置

频繁触发（resize scroll）使用节流和防抖

使用 createDocumentFragment 批量操作 DOM

优化动画，使用 css3 和 requestAnimationFrame

**BFC：**

Block Format Context 块级格式化上下文

内部元素无论如何改动，都不会影响其他元素的位置

**触发 BFC 的条件：**

根节点<html>

float： left/right

overflow: auto/scroll/hidden

display: inline-block/table/table-row/table-cell

display: flex/grid; 的直接子元素

position：absolute/fixed

#### 三十九、如何实现网页多标签通讯

使用 WebSoket（无跨域限制，需服务端支持，成本过高）

通过 localStorage 通讯（同域下）

通过 SharedWorker 通讯（调试不方便，不兼容 IE11）

​ SharedWorker 是 WebWorker 的一种

​ WebWorker 可开启子进程执行 JS，当不能操作 DOM

​ SharedWorker 可单独开启一个进程，用于同域页面通讯

#### 四十、网页和 iframe 之间如何通讯

是同域名下使用 postMessage 通讯（接受用 window.addEventListener("message")）

注意跨域的限制和判断

#### 四十一、请描述 koa2 的洋葱圈模型

Koa 的中间件模型就是洋葱圈模型。Koa 的每个中间件就像是一个洋葱圈，每次当有一个请求进入的时候，每个中间件都会被执行两次。

![](E:\Installed\Tencent\Pictures\QQplayerPic\6-23 请描述 koa2 的洋葱圈模型[00_08_52][20220405-225333].png)

### `实际工作经验-是否做过真实项目`

如果网页的访问慢，你如何分析问题原因？

Vue 应该如何监听 JS 报错？

你遇到了哪些项目难点？如何解决的？

#### 四十二、H5 页面如何进行首屏优化？

**路由懒加载**

适用于 SPA（不适用 MPA）

路由拆分，优先保证首页加载

**服务端渲染 SSR**

传统的前后端分离（SPA）渲染页面的过程复杂

SSR 渲染页面过程简单，所有性能好

如果是纯 H5 页面，SSR 是性能优化的终极方案（但是成本也高）

Nuxt.js（Vue）

Next.js（React）

**App 预取**（移动端 H5 要结合 App 能力去优化）

如果 H5 在 App WebView 中展示，可使用 App 预取

用户访问列表页时，App 预加载文章首屏内容

用户进入 H5 页，直接从 App 中获取内容，瞬间展示首屏

**分页**

针对列表页

默认值展示第一页内容

上划加载更多

**图片懒加载**lazyLoad

针对详情页

默认值展示文本内容，然后触发图片懒加载

注意：提前设置图片尺寸，尽量只重绘不重排

**Hybrid**（严格来说 Hybrid 不属于 H5）

提前将 HTML JS CSS 下载到 App 内部

在 App webview 中使用 file://协议加载页面内容

在用 Ajax 获取内容并展示（也结合 App 预取）

#### 四十三、后端一次性返回 10W 条数据，如何渲染？

技术方案设计不合理

**自定义中间层**

​ 自定义 nodejs 中间层，获取并拆分这 10W 条数据

​ 前端对接 nodejs 中间层，而不是服务端（成本比较高）

**虚拟列表**

​ 只渲染可视区域 DOM

​ 其它隐藏区域不显示，使用 div 撑起高度

​ 随着浏览器滚动，创建和销毁 DOM

​ vue-virtual-scroll-list

​ react-virtualiszed

#### 四十四、前端常用的设计模式和使用场景

**工厂模式**

用一个工厂函数，来创建实例，隐藏 new

**单例模式**

全局唯一的实例（无法生成第二个，如 Vuex Redux 的 store， 全局唯一的 dialog modal）

```js
class SingleTon {
    private constructor() {}
    private static instance: SingleTon | null = null
    public static getInstance(): SingleTon {
        if (this.instance === null) {
            this.instance = new SingleTon()
        }
        return this.instance
    }
	fn1() {}
	fn2() {}
}

const s = SingleTon.getInstance()
s.fn1()
```

**代理模式**

使用者不能直接访问对象，而是访问一个代理层

在代理层可以监听 get set 做很多事情

如 ES6 Proxy 实现 Vue3 响应式

**观察者模式**

```js
// 一个主题，一个观察者，主题变化之后触发观察者执行
btn.addEventListener("click", () => {});
```

**发布订阅事件**

```js
// 绑定
event.on("event-key", () => {
  // 事件1
});

event.on("event-key", () => {
  // 事件2
});

// 触发执行
event.emit("event-key");
```

**装饰器模式**

原功能不变，增加一些新功能（AOP 面向切面编程）

ES 和 Typescript 的 Decorator 语法

类装饰器，方法装饰器

#### 四十五、观察者模式和发布订阅模式的区别

![](E:\Installed\Tencent\Pictures\QQplayerPic\7-7 【连环问】观察者模式和发布订阅模[00_01_58][20220406-001158].png)

观察者模式：Subject 和 Observer 直接绑定，没有中间媒介

发布订阅：Publisher 和 Observer 互不认识，需要中间媒介 Event channel

#### 四十六、在实际工作中，你对 Vue 做过哪些优化

computed 缓存数据

keep-alive 缓存组件（频繁切换的组件，慎用，缓存会占用太多内存）

异步组件（针对体积比较大的组件，如编辑器、复杂表格表单等，拆包，需要时异步加载）

```vue
import { defineAsyncComponent } from 'vue' components: { Child:
defineAsyncComponents(() => import(/* webpackChunkName: "async-child" */
'./Child.vue')) }
```

路由懒加载，路由拆分

服务端渲染 SSR（可使用 Nuxt.js，按需优化）

#### 四十七、在使用 Vue 的过程中遇到过哪些坑

内存泄漏（全局变量，全局事件，全局定时器，自定义事件没销毁）

Vue2 响应式的缺陷（Vue3 不再有）

​ data 新增属性用 Vue.set，data 删除属性用 Vue.delete，无法直接修改数据 arr[index] = value

路由切换后 scroll 到顶部

​ 点击详情后缓存 scrollTop，返回后 scrollTo（可能会有卡顿）

​ 终极方案：MPA + App WebView

#### 四十八、实际工作中，做过哪些 React 优化

修改 CSS 模拟 v-show

```react
{ !flag && <MyComponent style={{ display: 'none' }}/> }
{ flag && <MyComponent/> }

<MyComponent style={{ diaplay: flag ? 'block' : 'none' }} />
```

循环使用 key

使用 Fragment 减少层级

```react
render() {
    return <>
    	<p>hellow</p>
    	<p>world</p>
    </>
}
```

JSX 中不要定义函数

箭头函数或者构造函数中 bind this

使用 shouldComponentUpdate（判断组件是否更新，或者使用 React.PureComponent，函数组件使用 React.memo）

Hooks 缓存数据和函数（useMemo，useCallback）

其它（异步组件（lazy）、路由懒加载、SSR-Next.js）

```react
import React, { lazy, Suspense } from 'react'
const OtherCompinent = lazy(
	/* webpackChunkName: 'OtherComponent' */
    () => import('./OtherComponent')
)

function MyConponent() {
    return (
    	<Suspense fallback={<div>Loading......</div>}>
        	<OtherComponent/>
        </Suspense>
    )
}
```

```react
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const List = lazy(() => import(/* webpackChunkName: 'List' */ './List'))

const App = () => (
	<Router>
    	<Suspense fallback={<div>Loading...</div>}>
        	<Switch>
            	<Route exact path="/" component={Home}></Route>
                <Route path="/list" component={List}></Route>
            </Switch>
        </Suspense>
    </Router>
)
```

#### 四十九、在使用 React 时遇到哪些坑

自定义组件首字母大写

JS 关键字冲突

```react
{ /* for 改为htmlFor，class 要改为 className */ }
<label htmlFor="input-name" className="XXX">
	姓名 <input id="input-name" />
</label>
```

JSX 数据类型

```react
<Demo number={1} flag={true} />
<Demo number='1' flag='true' />
```

setState 是异步更新的

#### 五十、如何统一监听 Vue 组件报错

errorCaptured 监听下级组件错误，返回 false 阻止向上传播

errorHandle 监听全局 Vue 组件错误

window.onerror 监听其它 JS 错误，如异步

#### 五十一、如何监听 React 组件报错

**ErrorBoundary 组件：**（16 版本之后）

监听所有下级组件报错，可降级展示 UI

只监听组件渲染时报错，不监听 DOM 事件、异步报错（可用 try-catch 或 window.onerror）

production 环境生效，dev 环境直接抛出错误

#### 五十二、如果 H5 很慢，如何排查性能问题

**前端性能指标：**

First Paint（FP）

First Contentful Paint（FCP）

First Meaningful Paint（FMP）---- 已弃用，改用 LCP

DomContentLoaded（DCL）

Largest Contentfull Paint（LCP）

Load（L）

Lighthouse 测试报告

分析性能指标，找出慢的原因（加载慢？渲染慢）

**网页加载慢：**

优化服务端硬件配置，使用 CDN

路由懒加载，大组件异步加载----减少主包体积

优化 HTTP 缓存策略

**网页渲染慢：**

优化服务端接口（如 Ajax 获取数据慢）

继续分析，优化前端组件内部逻辑（参考 Vue React 优化）

服务端渲染

### `编写高质量代码-正确，完整，清晰，鲁棒`

#### 五十三、手写 JS 函数，实现数组扁平化

```js
// 一级扁平化
export function flatten1(arr: any[]): any[] {
  const res: any[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((n) => res.push(n));
    } else {
      res.push(item);
    }
  });
  return res;
}
export function flatten2(arr: any[]): any[] {
  let res: any[] = [];
  arr.forEach((item) => {
    res = res.concat(item);
  });

  return res;
}

// 深度扁平化则使用递归

// toString 也可实现（对于元素是非引用类型）
const arr = [1, [2], [3, 4, 5, [6, ["a", ["b"], ""], 7, [8, 9]]], 0];
arr.toString().split(","); // 包含 {x: 1} 类型元素的时候， 对象会变为 '[object Object]'
```

#### 五十四、手写一个 getType 函数，获取详细的数据类型

```js
// 1. typeof 和 instanceof 结合也可实现 （类型较多，容易遗漏）

// 2. Object.prototype.toString.call() 调用对象原型上的toString方法

function geType(param: any): string {
  const originType = Object.prototype.toString.call(param);
  const spaceIndex = originType.indexOf(" ");
  const type = originType.slice(spaceIndex + 1, -1);
  return type.toLowerCase();
}
```

#### 五十五、new 一个对象的过程是什么，手写代码表示

创建一个空对象 **obj**，继承构造函数的原型；

执行构造函数（将 obj 作为 this）

返回 obj

```js
// T 为泛型，动态类型，表示定义什么类型就返回什么类型
export function createNew<T>(constructor: Function, ...args: any[]): T {
  // 1. 创建空对象 obj，并继承构造函数的原型
  const obj = Object.create(constructor.prototype);
  // 2. 将 obj 作为 this 执行构造函数
  constructor.apply(obj, args);
  // 3. 返回 obj
  return obj;
}

class Foo {
  name: string;
  city: string;
  age: number;

  constructor(name: string, city: string, age: number) {
    this.name = name;
    this.city = city;
    this.age = age;
  }

  getName() {
    return this.name;
  }
}

const f1 = new Foo("zhihui", "beijing", 28);
const f2 = createNew(Foo, "zhihui", "beijing", 28);

console.info(f1);
console.info(f2);
```

**Object.create 和 {} 的区别：**

{} 创建空对象，原型指向 Object.prototype；

Object.create 创建空对象，原型指向传入的参数。

#### 五十六、深度/广度 优先遍历一个 DOM 树

```js
/**
 * @description 遍历 DOM tree
 */
function visitNode(n: Node) {
    if (n instanceof Comment) {
        // 注释
        console.info("Test node---", n.textContent)
    }
    if (n instanceof Text) {
        const t = n.textContent?.trim()
        if (t) {
            // 文本
            console.info("Test node---", n.textContent?.trim())
        }
    }
    if (n instanceof HTMLElement) {
        // element
        console.info("Element node---", `<${n.tagName.toLowerCase()}>`)
    }
}

/**
 * 深度优先遍历（也可以使用栈代替递归）
 * @param root
 */
export function depthFirstTraverse(root: Node) {
    visitNode(root)

    // .childNodes 获取所有 Node 节点（注释文本等）；.children 只获取元素（不获取注释和文本）
    const childNodes = root.childNodes

    if (childNodes.length) {
        childNodes.forEach(child => {
            depthFirstTraverse(child)
        })
    }
}
// 深度优先遍历（栈实现）
export function depthFirstTraverse2(root: Node) {
    const stack: Node[] = []
    stack.push(root)

    while(stack.length > 0) {
        const curNode = stack.pop()
        if (curNode == null) break

        visitNode(curNode)

        const childNodes = curNode.childNodes
        if (childNodes.length) {
            Array.from(childNodes).reverse().forEach(child => stack.push(child))
        }
    }
}

/**
 * 广度优先遍历
 * @param root
 */
export function breadthFirstTraverse(root: Node) {
    // 数组实现队列 （数组、链表）
    // const queue: Node[] = []
    const queue = new MyQueue()
    queue.add(root)

    while (queue.length > 0) {
        const node = queue.delete()
        if (node == null) break

        visitNode(node)

        // 子元素入队
        const childNodes = node.childNodes
        if (childNodes.length > 0) {
            childNodes.forEach((child: Node) => {
                queue.add(child)
            })
        }
    }
}

// 链表实现队列
interface ILinkListNode {
    value: Node,
    next: ILinkListNode | null
}
class MyQueue {
    private head: ILinkListNode | null = null
    private tail: ILinkListNode | null = null
    private len: number = 0

    add(n: Node) {
        const node = {
            value: n,
            next: null
        }
        if (this.head === null) {
            this.head = node
        }
        const tail = this.tail
        if (tail) {
            tail.next = node
        }
        this.tail = node
        this.len++
    }
    delete() {
        const head = this.head
        if (head === null) return null
        if (this.len <= 0) return null

        const value = head.value
        this.head = head.next

        this.len--
        return value
    }
    get length(): number {
        return this.len
    }
}

```

#### 五十七、手写一个 LazyMan，实现 sleep 机制

```js
class LazyMan {
    private name: string
    private tasks: Function[] = []

    constructor(name: string) {
        this.name = name

        setTimeout(() => {
            this.next()
        })
    }

    private next() {
        const task = this.tasks.shift()
        if (task) task()
    }

    eat(k: string) {
        const task = () => {
            console.info(`${this.name} eat ${k}`)
            this.next() // 立刻执行下一个任务
        }

        this.tasks.push(task)

        return this
    }


    sleep(seconds: number) {
        const task = () => {
            console.info(`${this.name} 开始睡觉了`)
            setTimeout(() => {
                console.info(`${this.name} 睡了 ${seconds}s，开始执行下一个任务`)
                this.next() // 立刻执行下一个任务
            }, seconds * 1000)
        }

        this.tasks.push(task)
        return this
    }
}

const me = new LazyMan("zhihui")
me.eat("苹果").eat("菠萝").sleep(2).eat("西瓜").sleep(2).eat("芒果")

// 输出
zhihui eat 苹果
zhihui eat 菠萝
zhihui 开始睡觉了
zhihui 睡了 2s，开始执行下一个任务
zhihui eat 西瓜
zhihui 开始睡觉了
zhihui 睡了 2s，开始执行下一个任务
zhihui eat 芒果
```

#### 五十八、手写 curry 函数，实现函数柯里化

```ts
export function curry(fn: Function) {
  // 获取 fn 参数长度
  const fnArgaLength = fn.length;
  let args: any[] = [];

  // ts 中，独立的函数，this 需要声明类型
  function calc(this: any, ...newArgs: any[]) {
    // 积累参数
    args = [...args, ...newArgs];

    if (args.length < fnArgaLength) {
      // 参数不够，返回函数
      return calc;
    } else {
      // 参数够了，返回执行结果
      return fn.apply(this, args.slice(0, fnArgaLength));
    }
  }

  return calc;
}

function add(a: number, b: number, c: number): number {
  return a + b + c;
}
// add(10, 20, 30)

const curryAdd = curry(add);
const res = curryAdd(10)(20)(30);
console.info(res);
```

#### 五十九、instanceof 原理，用代码实现

**instanceof 原理：**

例如 `f instanceof Foo`

顺着 `f.__proto__`向上查找（原型链）

看能否找到 `Foo.prototype`

![](E:\Installed\Tencent\Pictures\QQplayerPic\8-13 instanceof 原理是什么[00_02_06][20220414-135442].png)

```ts
export function myInstanceof(instance: any, origin: any): boolean {
  if (instance == null) return false; // null undefined

  const type = typeof instance;
  if (type !== "object" && type !== "function") {
    // 所有的值类型 instanceof 都会返回 false
    return false;
  }

  let tempInstance = instance; // 防止修改 instance
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true;
    }

    tempInstance = tempInstance.__proto__;
  }

  return false;
}
```

#### 六十、手写 bind 功能

```ts
// @ts-ignore
Function.prototype.customBind = function (context: any, ...bindArgs: any[]) {
  // context 是 bind 传入的 this
  // bindArgs 是 bind 传入的各个参数

  const self = this; // 当前的函数本身

  return function (...args: any[]) {
    const newArgs = bindArgs.concat(args);
    return self.apply(context, newArgs);
  };
};

const fn = function (this: any, a: any, b: any, c: any) {
  console.info(this, a, b, c);
};

// @ts-ignore
const f = fn.customBind({ x: 100 }, 10);
f(20, 30);
```

#### 六十一、手写函数 call 和 apply 功能

```ts
/**
 * @description 自定义 call apply
 *
 * { x: 100, fnn() { this.x } }
 */

// @ts-ignore
Function.prototype.customCall = function (context: any, ...callArgs: any[]) {
  // call 和 apply 中如果传入的 this 为 null/undefined 时，此时 this 指向 window
  if (context == null) {
    context = globalThis; // globalThis 相当于浏览器中的 window 或者nodejs中的 global
  }
  if (typeof context !== "object") {
    context = new Object(context); // 值类型，变为对象
  }

  const fnKey = Symbol(); // 不会出现属性名称的覆盖
  context[fnKey] = this; // this 就是当前的函数

  const res = context[fnKey](...callArgs);

  delete context[fnKey]; // 清理掉 fn， 防止污染

  return res;
};

// @ts-ignore
Function.prototype.customApply = function (context: any, applyArgs: any[]) {
  if (context == null) context = globalThis;
  if (typeof context !== "object") context = new Object(context);

  const fnKey = Symbol();
  context[fnKey] = this;

  const res = context[fnKey](...applyArgs);

  delete context[fnKey];

  return res;
};
```

#### 六十二、手写 EventBus 自定义事件

```ts
class EventBus {
  /**
     {
        "key1": [
            { fn: Function, isOnce: false }
        ]
        "key2": [] // 有序
        "key3": []
     }
     */

  private events: {
    [key: string]: Array<{ fn: Function; isOnce: boolean }>;
  };

  constructor() {
    this.events = {};
  }

  on(type: string, fn: Function, isOnce: boolean = false) {
    const events = this.events;
    if (events[type] == null) {
      this.events[type] = [];
    }
    this.events[type].push({ fn, isOnce });
  }

  once(type: string, fn: Function) {
    this.on(type, fn, true);
  }

  off(type: string, fn?: Function) {
    if (!fn) {
      // 解绑所有 type 的函数
      this.events[type] = [];
    } else {
      const fnList = this.events[type];
      if (fnList) {
        this.events[type] = fnList.filter((item) => item.fn !== fn);
      }
    }
  }

  emit(type: string, ...args: any[]) {
    const fnList = this.events[type];
    if (fnList == null) return;
    this.events[type] = fnList.filter((item) => {
      const { fn, isOnce } = item;
      fn(...args);
      return !isOnce;
    });
  }
}
```

#### 六十三、用 JS 实现一个 LRU 缓存-分析数据结构特点（使用 Map）

**什么是 LRU 缓存？**

LRU - Least Recently Used 最近使用

如果内存优先，只缓存最近使用的，删除 ”沉水“数据

核心 API 两个：get set

```ts
export class LRUCache {
  private length: number;
  private data: Map<any, any> = new Map();

  constructor(length: number) {
    if (length < 1) throw new Error("invalid length");
    this.length = length;
  }

  set(key: any, value: any) {
    const data = this.data;

    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);

    if (data.size > this.length) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  get(key: any): any {
    const data = this.data;

    if (!data.has(key)) return null;

    const value = data.get(key);

    data.delete(key);
    data.set(key, value);

    return value;
  }
}
```

#### 六十四、不用 Map 实现 LRU（双向链表）

```ts
/**
 * @description LRU Cache - 不适用 Map
 */

interface IListNode {
  value: any;
  key: string; // 存储 key，方便删除（否则删除时就需要遍历）
  prev?: IListNode;
  next?: IListNode;
}

export default class LRUCache {
  private length: number;
  private data: { [key: string]: IListNode } = {};
  private dataLength: number = 0;
  private listHead: IListNode | null = null;
  private listTail: IListNode | null = null;

  constructor(length: number) {
    if (length < 1) throw new Error("invalid length");
    this.length = length;
  }

  private moveToTail(curNode: IListNode) {
    const tail = this.listTail;
    if (tail === curNode) return;

    // ----------------- 1. 让 prevNode 和 nextNode 断绝与 curNode 的关系 ------------------
    const prevNode = curNode.prev;
    const nextNode = curNode.next;
    if (prevNode) {
      if (nextNode) {
        prevNode.next = nextNode;
      } else {
        delete prevNode.next;
      }
    }
    if (nextNode) {
      if (prevNode) {
        nextNode.prev = prevNode;
      } else {
        delete nextNode.prev;
      }

      // 此时如果要移动的当前节点是head，则需要重新改变head
      if (this.listHead === curNode) {
        this.listHead = nextNode;
      }
    }

    // ----------------- 2. 让 curNode 断绝 prevNode 和 nextNode 的关系 ------------------
    delete curNode.prev;
    delete curNode.next;

    // ----------------- 3. 在 list 末尾重新建立 curNode 的新关系 ------------------
    if (tail) {
      tail.next = curNode;
      curNode.prev = tail;
    }

    this.listTail = curNode;
  }

  private tryClean() {
    while (this.dataLength > this.length) {
      const head = this.listHead;
      if (head == null) {
        throw new Error("head is null");
      }

      const haedNext = head.next;
      if (haedNext == null) {
        throw new Error("headNext is null");
      }

      // -----------------1. 断绝 head 和 next 的关系-------------------
      delete head.next;
      delete haedNext.prev;

      // -----------------2. 重新赋值 listHead -------------------
      this.listHead = haedNext;

      // -----------------3. 清理 data，重新计数 -------------------
      delete this.data[head.key];
      this.dataLength--;
    }
  }

  get(key: string): any {
    const data = this.data;
    const curNode = data[key];

    if (curNode == null) return null;

    if (this.listTail === curNode) {
      return curNode.value;
    }

    // curNode 移动到末尾
    this.moveToTail(curNode);

    return curNode.value;
  }

  set(key: string, value: any) {
    const data = this.data;
    const curNode = data[key];

    if (curNode == null) {
      // 新增数据
      const newNode: IListNode = { key, value };
      // 移动到末尾
      this.moveToTail(newNode);

      data[key] = newNode;
      this.dataLength++;

      if (this.dataLength === 1) {
        this.listHead = newNode;
      }
    } else {
      // 修改现有数据
      curNode.value = value;

      // 移动到末尾
      this.moveToTail(curNode);
    }

    // 尝试清理长度
    this.tryClean();
  }
}
```

#### 六十五、手写 JS 深拷贝-考虑各种数据类型（Map、Set 等）和循环引用

1、使用 JSON.stringify 和 JSON.parse（无法转换函数、无法转换 Map 和 Set、无法转换循环引用）

2、Object.assign()，方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

```js
const obj = {
  x: 100,
  info: {
    city: "北京",
  },
};

const obj1 = Object.assign({}, obj);
obj1.info.city = "beijing";
obj1.x = 200;

obj.info.city; // beijing
obj.x; // 100
```

**普通深拷贝**

只考虑 Object Array

无法转换 Map Set 和循环引用

```ts
/**
 * @description 深拷贝 - 只考虑了简单的数组、对象
 */
function cloneDeep1(obj: any) {
  if (typeof obj !== "object" || obj == null) return obj;

  let result: any;

  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (const key in obj) {
    // hasOwnProperty 这个方法会查找一个对象是否有某个属性，但是不会去查找它的原型链。
    if (obj.hasOwnProperty(key)) {
      result[key] = cloneDeep1(obj[key]); // 递归调用
    }
  }

  return result;
}

/**
 *
 * @param obj obj
 * @param map weakmap 为了避免循环引用
 */
export function cloneDeep(obj: any, map = new WeakMap()): any {
  if (typeof obj !== "object" || obj == null) return obj;

  // 避免循环应用
  const objFromMap = map.get(obj);
  if (objFromMap) return objFromMap;

  let target: any = {};
  map.set(obj, target);

  // Map
  if (obj instanceof Map) {
    target = new Map();
    obj.forEach((v, k) => {
      const v1 = cloneDeep(v, map);
      const k1 = cloneDeep(k, map);
      target.set(k1, v1);
    });
  }

  // Set
  if (obj instanceof Set) {
    target = new Set();
    obj.forEach((v) => {
      const v1 = cloneDeep(v, map);
      target.add(v1);
    });
  }

  // Array
  if (obj instanceof Array) {
    target = obj.map((item) => cloneDeep(item, map));
  }

  // RegExp
  if (obj instanceof RegExp) {
    target = obj;
  }

  // Object
  for (const key in obj) {
    const val = obj[key];
    const val1 = cloneDeep(val, map);
    target[key] = val1;
  }

  return target;
}
```

### `分析和解决问题的思路 - 可以独立解决问题`

#### 六十六、[1, 2, 3].map(parseInt)

```js
// [1, 2, 3].map(parseInt) // 1 NaN NaN
const arr = [1, 2, 3]; // (1, 0) (2, 1) (3, 2)
arr.map((item, index) => {
  return parseInt(item, index);
});
```

parseInt(string, radix) radix 为可选参，表示要解析的数字的基数，介于 2-36 之间；当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数

#### 六十七、函数形参修改，能否影响实参

```js
function fn(x) {
  x = 200;
}

var num = 100;
var obj = { x: "dd" };
fn(num); // 100
fn(obj); // { x: "dd" } 如果在函数内部改变传入对象的属性，则原对象会改变
```

函数参数是赋值传递

```js
function fn(x, y) {}
const num = 100;
const obj = { name: "zhihui" };
fn(num, obj);

// ---->>

let x = num;
let y = obj;
```

#### 六十八、手写 convert 函数，将数组转为树

```ts
const arr = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 2, name: "部门B", parentId: 1 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 2 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
];

interface ITreeItem {
  id: number;
  name: string;
  parentId: number;
}

interface ITreeNode {
  id: number;
  name: string;
  children?: ITreeNode[];
}

export function convert(arr: ITreeItem[]): ITreeNode | null {
  // 用于 id 和 treeNode 映射
  const idToTreeNode: Map<number, ITreeNode> = new Map();

  let root = null;

  arr.forEach((item, index) => {
    const { id, name, parentId } = item;
    const treeNode: ITreeNode = { id, name };

    idToTreeNode.set(id, treeNode);

    const parentNode = idToTreeNode.get(parentId);
    if (parentNode) {
      if (parentNode.children == null) parentNode.children = [];
      parentNode.children.push(treeNode);
    }

    if (parentId === 0) root = treeNode;
  });

  return root;
}
```

#### 六十九、把一个树转为数组

广度优先遍历

```ts
interface ITreeNode {
  id: number;
  name: string;
  children?: ITreeNode[];
}

interface ITreeItem {
  id: number;
  name: string;
  parentId: number;
}

export function convert(root: ITreeNode): ITreeItem[] {
  const treeNodeToTreeNode: Map<ITreeNode, ITreeNode> = new Map();

  const result: ITreeItem[] = [];

  const queue: ITreeNode[] = [];
  queue.push(root);

  while (queue.length > 0) {
    const curNode = queue.shift();
    if (curNode == null) break;

    const { id, name, children = [] } = curNode;
    const parentNode = treeNodeToTreeNode.get(curNode);
    const parentId = parentNode?.id || 0;
    const treeItem = { id, name, parentId };

    result.push(treeItem);

    children.forEach((item) => {
      queue.push(item);
      treeNodeToTreeNode.set(item, curNode);
    });
  }

  return result;
}
```

#### 七十、构造函数和原型的重名属性

```js
function Foo() {
  Foo.a = function () {
    console.info(1);
  };
  this.a = function () {
    console.info(2);
  };
}

Foo.prototype.a = function () {
  console.info(3);
};
// Foo.prototype.b = function() { console.info(100) }

Foo.a = function () {
  console.info(4);
};

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();

// 4 2 1
```

#### 七十一、promise-then 执行顺序问题

```js
Promise.resolve()
  .then(() => {
    console.info(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.info(res);
  });

Promise.resolve()
  .then(() => {
    console.info(1);
  })
  .then(() => {
    console.info(2);
  })
  .then(() => {
    console.info(3);
  })
  .then(() => {
    console.info(5);
  })
  .then(() => {
    console.info(6);
  });

// 输出 0 1 2 3 4 5 6
```

**如果有多个 fulfilled promise 实例，同时执行 then 链式调用，then 会交替执行**

then 中返回 promise 实例，会出现“慢两拍”的效果

第一拍，promise 需要有 pending 变为 fulfilled

第二拍，then 函数挂载到 MicroTaskQueue（参考 Event Loop）

#### 七十二、React-setState 经典面试题

```react

componentDidMount() {
    // this.state.val 初始值是 0

    // 传入函数时 state 不会合并
    // this.setState((preState, props) => {
    //     return { val: preState.val + 1 }
    // })
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)

    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)

    setTimeout(() => {
        this.setState({ val: this.state.val + 1 })
	    console.log(this.state.val)

        this.setState({ val: this.state.val + 1 })
	    console.log(this.state.val)
    }, 0)
}

// 0 0 2 3
```

state 默认异步更新

state 默认合并后更新

**state 同步更新 - 不在 React 上下文中更新**

setTimeout、setInterval、promise.then

自定义的 DOM 事件（addEventListener("click", () => {})中是同步更新，onClick={}中是异步更新）

Ajax 回调

**注意：React 18 中不一样**

上述场景，在 React 18 中可以异步更新（Auto Batch）

需将 ReactDOM.render 替换为 ReactDOM.createRoot

#### 七十三、React-setState 是微任务还是宏任务

**setState 本质是同步（不是宏任务或微任务，宏任务或微任务是对于异步来说的）**
setState 是同步，只不过让 React 做成了异步的样子
因为要考虑性能，多次 state 修改，只进行一次 DOM 渲染
日常所说的“异步”不严谨

#### 七十四、对象和属性的连续赋值

```js
let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };

console.log(a.x); // undefined
console.log(b.x); // { n: 2 }
```

**a.x 的优先级要比赋值优先级高**
可拆解为：
a.x = undefined
let x = a.x // x 变量是假想的，实际执行时不会有
x = a = { n: 2 }

#### 七十五、对象属性类型的问题

```js
let a = {},
  b = "123",
  c = 123;
a[b] = "b";
a[c] = "c";
console.log(a[b]); // c

let a = {},
  b = Symbol("123"),
  c = Symbol("123");
a[b] = "b";
a[c] = "c";
console.log(a[b]); // b

let a = {},
  b = { key: "123" },
  c = { key: "456" };
a[b] = "b";
a[c] = "c";
console.log(a[b]); // c
```

**JS 对象 key 的数据类型**
只能是字符串和 Symbol 类型
其他类型会被转换为字符串
转换字符串会直接调用它的 toString() 方法
**扩展：Map 和 WeakMap 的 key**
Map 的 key 可以是各种类型
WeakMap 的 key 只能是引用类型，传入值类型会报错

### 请说明Ajax Fetch Axios三者的区别
1. 三者都用于网络请求，但是不同维度  
2. Ajax，一种技术统称   
3. Fetch，一个具体的API   
4. Axios，第三方库

#### 用XMLHttpRequest实现Ajax
```
function ajax(url, sucessFn) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                successFn(xhr.responseText)
            }
        }
    }
    xhr.send(null)
}
```

### 节流和防抖
- 放抖：防止抖动“你先抖动着，啥时候停了，再执行下一步” （例如搜索输入框，只响应最后一次）
```
function debounce(fn: () => void, delay: number = 200) {
    let timer: number = 0
    return function () {
        if (timer !== 0) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}
```
- 节流：节流，节省交互沟通。流，不一定指流量 (一段时间只响应第一次，例如表单提交)
```
function throttle(fn: () => void, delay: number = 200) {
    let flag = true
    return () => {
        if (flag) {
            setTimeout(() => {
                fn()
                flag = true
            }, delay)
        }
        flag = false
    }
}
``` 

### px % em rem vw/vh 有什么区别
- px基本单位，绝对单位（其他的都是相对单位）
- % 相对于父元素的宽度比例
- em 相对于当前元素字体大小，本身没有字体大小相对于父元素字体大小（字体大小会继承）
- rem 相对于根节点的字体大小
- vw屏幕宽度的1%
- vh屏幕高度的1%
- vmin两者的最小值，vmax两者的最大值

### 箭头函数
>> this在声明时就已绑定，且无法修改
+ 箭头函数有什么缺点？
    + 没有arguments
    + 无法通过apply call bind改变this
    + 某些箭头函数代码难以阅读
+ 什么时候不能使用箭头函数？
    + 对象的方法
    + 原型方法
    + 构造函数
    + 动态上下文中的回调函数
    ```
    const btn = document.getElementById('btn')
    btn.addEventListener('click', () => {
        this.innerHtml = 'clicked'
    })
    ```
    + vue生命周期和menthod

### 请描述TCP三次握手和四次挥手
> 建立TCP连接
- 先建立连接（确保双方都有收发消息的能力）
- 再传输内容（如发送给一个get请求）
- 网络连接是TCP协议，传输内容是HTTP协议

> 三次握手
- Client发包，Server接收。Server：有Client要找我
- Server发包，Client接收。Client：Server已经收到消息了
- Client发包，Server接收。Server：Client要准备发送了

### for...in 和 for...of有什么区别
- for...in遍历得到key
    - 用于可枚举的数据，如对象、数组、字符串
- for...of遍历得到value
    - 用于可迭代数据，如数组、字符串、Map、Set

### for await ..of有什么用？
- 用于遍历多个Promise
```
for await (let promiseRes in list) {
    console.log(promiseRes)
}
```

### offsetHeight scrollHeight clientHeight区别
- offsetHeight offsetWidth: border + padding + content
- clientHeight clientWidth: padding + content
- scrollHeight scrollWidth: padding + 实际内容尺寸

### HTMLCollection 和 NodeList区别？
>Node和Element
- DOM是一棵树，所有节点都是Node
- Node是Element的基类
- Element是其他HTML元素的基类，如HTMLDivElement

### Vue computed和watch区别
- computed用于计算产生新的数据，有缓存
- watch用于监听现有数据

### vue组件通讯有几种方式，尽量全面
- props和$emit
- 自定义事件 (event-emitter: https://github.com/medikoo/event-emitter)
- $attr (如果props和emits没有定义，可以在$attr获取)
- $parent
- $refs
- provide/inject
- vuex

### Vuex mutation action区别
- mutation: 原子操作；必须同步代码
- action：可包含多个mutation; 可包含异步代码

### JS严格模式有什么特点
- 全局变量必须先声明
- 禁止使用with
- 创建eval作用域
- 禁止this指向window
- 函数参数不能重名

### HTTP跨域请求时为何发送options请求
- options请求，是跨域请求之前的预检查
- 浏览器自行发起的，无需我们干预
- 不会影响实际的功能
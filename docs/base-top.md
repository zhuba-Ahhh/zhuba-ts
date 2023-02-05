### 浏览器和nodejs的事件循环有什么区别？
>单线程和异步
- 浏览器中js执行和DOM渲染共用一个线程
- 异步
>宏任务和微任务
- 宏任务，如setTimeout，setInterval网络请求
- 微任务，如promise async/await
- 微任务在下一轮DOM渲染之前执行，宏任务在之后执行
>nodejs的宏任务和微任务，分不同的类型，有不同的优先级

### for 和 forEach哪个更快
- for更快，forEach每次都需要初始化一个函数去执行回调
- 函数需要独立的作用域，会有额外的开销

### 进程process vs 线程 thread
- 进程，OS进行资源分配和调度的最小单位，有独立的内存空间
- 线程，OS进行运算调度的最小单位，共享进程内存空间
- JS是单线程的，但可以开启多个进程

### requestIdleCallback 和 requestAnimationFrame
>由React fiber引起的关注
- 组件树转换为链表，可分段渲染
- 渲染时可以暂停，去执行其他高优任务，空闲时再继续渲染
- 如何判断空闲？requestIdleCallback
>区别
- requestAnimationFrame每次渲染完都会执行，高优
- requestIdleCallback空闲时才执行，低优

### vue生命周期
- setup >> beforeCreate >> created >> beforeMount >> mounted >> beforeUnmounted >> unmounted
- beforeUpdate >> updated
- keep-alive: activated >> deactivated

### Tree diff 的优化
- 只比较同一层级，不夸级比较
- tag不同则删掉重建（不再去比较内部的细节）
- 子节点通过key区分（key的重要性）

### Vue React为何循环时必须使用key？
- vdom diff算法会根据key判断元素是否需要删除？
- 匹配了key，则只移动元素 - 性能较好
- 未匹配key，则删除重建 - 性能较差

### Vue-router MemoryHistory (abstract)
>三种模式
- hash
- WebHistory
- MemoryHistory (V4之前叫做abstract history)
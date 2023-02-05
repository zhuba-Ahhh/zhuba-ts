// 定义 KVue 构造函数
class KVue {
    constructor(options) {
        this.$options = options;

        this.$data = options.data;

        // 响应化处理
        this.observe(this.$data);


        // new Watcher(this, 'foo');
        // this.foo;
        // new Watcher(this, 'bar.mua');
        // this.bar.mua;

        new Compile(options.el, this);

        const created = options.created;
        created && created.call(this);
    }

    observe(obj) {
        if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
            return;
        }

        // 遍历 obj
        Object.keys(obj).forEach(key => {
            // 响应式处理
            this.defineReactive(obj, key, obj[key])

            this.proxyData(key)
        })
    }

    defineReactive(obj, key, val) {
        // 递归遍历
        this.observe(val)

        const dep = new Dep();

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target);
                return val;
            },
            set(newVal) {
                if (newVal !== val) {
                    val = newVal;
                    dep.notify();
                }
            }
        })
    }

    // 在 vue 根上定义属性代理 data 中的数据
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key];
            },
            set(newVal) {
                this.$data[key] = newVal;
            }
        })
    }
}

// 创建Dep，管理所有 Watcher
class Dep {
    constructor() {
        // 存储所有依赖
        this.deps = [];
    }

    addDep(dep) {
        this.deps.push(dep);
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

// 创建 Watcher，保存 data 中数值和页面中的挂钩关系
class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        // 创建 Watcher 时，立即将该实例指向 Dep.target，便于依赖收集
        Dep.target = this;
        this.vm[key]; // 触发依赖收集
        Dep.target = null;
    }

    update() {
        // console.info(`${this.key} 更新了`);
        this.cb.call(this, this.vm[this.key]);
    }
}
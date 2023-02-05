// 遍历 DOM 解构，解析指令和插值表达式
class Compile {
    // el 代编译模板 vm KVue实例
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);

        // 把模板内容移到片段操作
        this.$fragment = this.nodeToFragment(this.$el);
        // 执行编译
        this.compile(this.$fragment)
        // 放回 $el 中
        this.$el.appendChild(this.$fragment)
    }

    // 
    nodeToFragment(el) {
        // 创建片段，游离于当前 DOM 文档之外，不会引起浏览器的刷新
        const fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if (node.nodeType === 1) {
                // 元素
                // console.info('编译元素' + node.nodeName);
                this.compileElement(node);
            } else if (this.isInter(node)) {
                // 只关心 {{xxx}}
                // console.info('编译插值文本' + node.textContent);
                this.compileText(node);
            }

            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }

    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node) {
        const exp = RegExp.$1;
        this.update(node, exp, 'text');
    }
    compileElement(node) {
        // 关心属性
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // k-xxx="yyy"
            const attrName = attr.name; // k-xxx
            const exp = attr.value; // yyy
            if (attrName.indexOf("k-") === 0) {
                const dir = attrName.substring(2); // xxx
                
                this[dir] && this[dir](node, exp)
            } else if (attrName.indexOf("@") === 0) {
                // @click="handleClick" exp: handleClick
                const dir = attrName.substring(1); // click
                // 事件监听处理
                this.eventHandler(node, this.$vm, exp, dir);
            }
        })
    }

    eventHandler(node, vm, exp, dir) {
        const fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm));
        }
    }

    update(node, exp, dir) {
        const updator = this[dir + "Updator"];
        updator && updator(node, this.$vm[exp]);
        new Watcher(this.$vm, exp, function(value) {
            updator && updator(node, value);
        })
    }

    textUpdator(node, value) {
        node.textContent = value;
    }

    text(node, exp) {
        this.update(node, exp, "text");
    }
    html(node, exp) {
        this.update(node, exp, "html");
    }
    model(node, exp) {
        this.update(node, exp, "model");

        node.addEventListener("input", (event) => {
            this.$vm[exp] = event.target.value;
        })
    }
    htmlUpdator(node, value) {
        node.innerHTML = value;
    }
    modelUpdator(node, value) {
        node.value = value;
    }
}
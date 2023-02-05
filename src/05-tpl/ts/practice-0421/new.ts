/**
 * @description new 一个对象的过程是什么，手写代码表示
 */

class Foo {
    name: string
    city: string

    constructor(name: string, city: string) {
        this.name = name
        this.city = city
    }

    getName() {
        return this.name
    }
}

export function createNew<T>(constructor: Function, ...args: any[]): T {
    // 创建一个空对象，并继承构造函数的原型
    const obj = Object.create(constructor.prototype)
    // 将 obj 作为 this 执行构造函数
    constructor.apply(obj, args)
    // 返回 obj
    return obj
}

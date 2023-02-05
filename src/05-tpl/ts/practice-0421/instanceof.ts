/**
 * @description instanceof 原理
 */

export function myInstanceof(target: any, origin: any): boolean {
    if (target == null) return false // null undefined 返回 false

    const type = typeof target
    if (type !== 'object' && type !== 'function') {
        // 所有的值类型 instanceof 都返回 false
        return false
    }

    let tempTarget = target // 防止修改 target
    while (tempTarget) {
        if (tempTarget.__proto__ === origin.prototype) {
            return true
        }

        tempTarget = tempTarget.__proto__
    }

    return false
}

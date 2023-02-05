/**
 * @description 回顾
 * 2.5：数组旋转 k 步
 * 2.7：判断字符串是否括号匹配
 * 2.8：两个栈实现一个队列: 先进先出（length、add、delete）
 * 2.9：链表，js 反转单向链表
 *  反转时需将当前节点的 next 指向上一节点，此时当前节点的原来 next 会丢失，因此需提前保存
 * 2.12：链表实现队列
 * 2.15：二分查找（已排序）
 * 2.19：找出数组中和为 n 的两个数，双指针（已排序）
 */

// 找出数组中和为 n 的两个数，双指针（已排序）
export function findTwoNumber(arr: number[], n: number): number[] {
    const res: number[] = [];
    const length = arr.length;
    if (length === 0) return res;

    let startIndex = 0;
    let endIndex = length - 1;

    while (startIndex < endIndex) {
        const startValue = arr[startIndex];
        const endValue = arr[endIndex];
        if (n > startValue + endValue) {
            startIndex++;
        } else if (n < startValue + endValue) {
            endIndex--;
        } else {
            res.push(startValue);
            res.push(endValue);
            break;
        }
    }

    return res;
}

// 二分查找（已排序）
export function binarySearch(arr: number[], k: number): number {
    let res: number = -1;
    const length = arr.length;
    if (length <= 0) return res;

    let startIndex: number = 0;
    let endIndex: number = length - 1;

    while (startIndex <= endIndex) {
        const midIndex = Math.floor((startIndex + endIndex) / 2);
        const midValue = arr[midIndex];
        if (midValue > k) {
            endIndex = midIndex - 1;
        } else if (midValue < k) {
            startIndex = midIndex + 1;
        } else {
            res = midIndex;
            break;
        }
    }

    return res;
}
export function binarySearch2(
    arr: number[],
    k: number,
    startIndex?: number,
    endIndex?: number
): number {
    const length = arr.length;
    let res: number = -1;
    if (length <= 0) return res;

    if (!startIndex) startIndex = 0;
    if (!endIndex) endIndex = length - 1;

    if (startIndex > endIndex) return res;

    const minIndex = Math.floor((startIndex + endIndex) / 2);
    const minValue = arr[minIndex];

    if (minValue > k) {
        return binarySearch2(arr, k, startIndex, minIndex - 1);
    } else if (minValue < k) {
        return binarySearch2(arr, k, minIndex + 1, endIndex);
    } else {
        res = minIndex;
    }
    return res;
}

// 链表实现队列
export interface ILinkNode {
    value: number;
    next: ILinkNode | null;
}
export class MyQueneByLink {
    private len: number = 0;
    private head: ILinkNode | null = null;
    private tail: ILinkNode | null = null;

    add(n: number) {
        const node: ILinkNode = {
            value: n,
            next: null,
        };
        if (this.head === null) {
            this.head = node;
        }
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        this.len++;
    }

    delete(): number | null {
        if (this.head === null) return null;

        const value = this.head.value;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.len--;
        return value;
    }

    get length(): number {
        return this.len;
    }
}

// 链表，js 反转单向链表（）
export interface ILinkList {
    value: number;
    next?: ILinkList;
}
export function createLinkList(arr: number[]): ILinkList {
    const length = arr.length;
    // 空数组时抛出异常
    if (length <= 0) throw new Error("arr is empty");

    let res: ILinkList = {
        value: arr[length - 1],
    };
    // 数组长度为 1 时立即抛出
    if (length === 1) return res;

    for (let i = length - 2; i >= 0; i--) {
        res = {
            value: arr[i],
            next: res,
        };
    }

    return res;
}
// 创建单向链表
export function reverseLinkList(linkList: ILinkList): ILinkList {
    let preLinkNode: ILinkList | undefined = undefined;
    let curLinkNode: ILinkList | undefined = undefined;
    let nextLinkNode: ILinkList | undefined = linkList;

    while (nextLinkNode) {
        if (!preLinkNode && curLinkNode) {
            delete curLinkNode.next;
        }

        if (preLinkNode && curLinkNode) {
            curLinkNode.next = preLinkNode;
        }

        preLinkNode = curLinkNode;
        curLinkNode = nextLinkNode;
        nextLinkNode = nextLinkNode?.next;
    }

    curLinkNode!.next = preLinkNode;

    return curLinkNode!;
}

// 两个栈实现一个队列（length、add、delete）
export class MyQueue {
    private stack1: number[] = [];
    private stack2: number[] = [];
    private len: number = 0;

    add(n: number) {
        this.len++;
        this.stack1.push(n);
    }
    delete(): number | null {
        let res;
        if (this.len === 0) return null;
        while (this.stack1.length) {
            const temp = this.stack1.pop();
            if (temp) {
                this.stack2.push(temp);
            }
        }
        this.len--;
        res = this.stack2.pop();
        while (this.stack2.length) {
            const temp = this.stack2.pop();
            if (temp) {
                this.stack1.push(temp);
            }
        }
        return res || null;
    }
    get length(): number {
        return this.len;
    }
}

// 数组旋转 k 步
export function rotateArray(arr: number[], k: number): number[] {
    const length = arr.length;
    if (length === 0 || !k) return arr;
    const step = Math.abs(k % length);

    const part1 = arr.slice(-step);
    const part2 = arr.slice(0, length - step);
    const part3 = part1.concat(part2);

    return part3;
}

// 判断字符串是否括号匹配
function isMatch(start: string | undefined, end: string | undefined): boolean {
    if (
        (start === "(" && end === ")") ||
        (start === "[" && end === "]") ||
        (start === "{" && end === "}")
    ) {
        return true;
    }
    return false;
}
export function matchBracket(str: string): boolean {
    const start = "([{";
    const end = "}])";
    const stack = [];

    for (let i = 0; i < str.length; i++) {
        if (start.includes(str[i])) {
            stack.push(str[i]);
        } else if (end.includes(str[i])) {
            if (!isMatch(stack.pop(), str[i])) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
